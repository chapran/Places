const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')

const gcconfig = {
    projectId: 'places-fb',
    keyFilename: 'rn_places.json'
}

const gcs = require('@google-cloud/storage')(gcconfig)

admin.initializeApp({
    credential: admin.credential.cert(require('./rn_places.json'))
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
            console.log('Token not found.')
            response.status(403).json({ error: 'Unauthorized' })
            return
        }
        const idToken = request.headers.authorization.split('Bearer ')[1]
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                const body = JSON.parse(request.body)
                fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
                    console.log(err)
                    return response.status(500).json({ error: err })
                })
                const bucket = gcs.bucket('places-fb.appspot.com')
                const uniqueId = uuid()

                bucket.upload('/tmp/uploaded-image.jpg', {
                    uploadType: 'media',
                    destination: '/places/' + uniqueId + '.jpg',
                    metadata: {
                        metadata: {
                            contentType: 'image/jpeg',
                            firebaseStorageDownloadTokens: uniqueId
                        }
                    }
                }, (err, file) => {
                    if (!err) {
                        response.status(201).json({
                            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                                bucket.name +
                                '/o/' +
                                encodeURIComponent(file.name) +
                                '?alt=media&token=' +
                                uniqueId
                        })
                    } else {
                        console.log(err)
                        response.status(500).json({ error: err })
                    }
                })
                return
            })
            .catch(() => {
                console.log('Token is invalid.')
                response.status(403).json({error: 'Token is not valid.'})
                
            })
    })
});
