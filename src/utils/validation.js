const validate = (val, rules, connectedValues) => {
    let isValid = true
    
    for (rule in rules) {
        switch(rule) {
            case 'isEmail':
                isValid = emailValidator(val)
                break
            case 'minLength':
                isValid = minLenghtValidator(val, rules[rule])
                break
            case 'equalTo': 
                isValid = checkEqualty(val, connectedValues[rule])
                break
        }
        if(!isValid) break
    }
    return isValid
}

const emailValidator = val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val)

const minLenghtValidator = (val, length) => val.length >= length

const checkEqualty = (val, compareValue) => val === compareValue

export default validate