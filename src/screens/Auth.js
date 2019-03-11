import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import DefaultInput from '../components/UI/DefaultInput'
import Heading from '../components/UI/Heading'
import MainText from '../components/UI/MainText'
import bg from '../assets/bg.jpg'
import DefaultButton from '../components/UI/DefaultButton'
import validate from '../utils/validation'
import { connect } from 'react-redux'
import { tryAuth, authAutoSignIn } from '../store/actions/auth'

class Auth extends Component {
    constructor(props) {
        super(props)
        const { height, width } = Dimensions.get('window')
        this.state = {
            authMode: 'login',
            viewMode: height > width ? 'portrait' : 'landscape',
            controls: {
                email: {
                    value: '',
                    isValid: false,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    isValid: false,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmPassword: {
                    value: '',
                    isValid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                    touched: false
                }
            }
        }
        Dimensions.addEventListener('change', this.handleOrientationChange)
    }

    componentDidMount() {
        this.props.authAutoSignIn()
    }

    toggleAuthMode = () => {
        this.setState(prevState => ({
            authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }))
    }

    handleInputChange = (key, value) => {
        this.setState(({ controls }) => {
            let connectedValues
            if (controls[key].validationRules.equalTo) {
                const connectedField = controls[key].validationRules.equalTo
                connectedValues = {
                    equalTo: controls[connectedField].value
                }
            }
            return {
                controls: {
                    ...controls,
                    [key]: {
                        ...controls[key],
                        value,
                        isValid: validate(value, controls[key].validationRules, connectedValues),
                        touched: true
                    }
                }
            }
        })
        if (key === 'password') {
            this.handleInputChange('confirmPassword', this.state.controls.confirmPassword.value)
        }
    }

    handleOrientationChange = dims => {
        const { height, width } = dims.window
        this.setState({
            viewMode: height > width ? 'portrait' : 'landscape'
        })
    }

    authHandler = () => {
        const { email, password } = this.state.controls
        const authData = {
            email: email.value,
            password: password.value
        }
        this.props.tryAuth(authData, this.state.authMode)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.handleOrientationChange)
    }

    render() {
        const submitSection = this.props.isLoading ? (
            <ActivityIndicator />
        ) : (
                <DefaultButton
                    disabled={isFormInvalid}
                    color='#29aaf4'
                    title='Submit'
                    onPress={this.authHandler} />
            )
        const { authMode, viewMode, controls } = this.state
        const { email, password, confirmPassword } = controls
        let headingText = null, passwordContainerStyles, passwordWrapperStyles
        const isFormInvalid = !email.isValid || !password.isValid || (authMode === 'signup' && !confirmPassword.isValid)
        if (viewMode === 'portrait') {
            headingText = (
                <View style={styles.headingContainer}>
                    <MainText>
                        <Heading>Please {authMode === 'login' ? 'Log In' : 'Sign Up'}</Heading>
                    </MainText>
                </View>
            )
        }
        if (viewMode === 'portrait' || authMode === 'login') {
            passwordContainerStyles = styles.p_PasswordContainer
            passwordWrapperStyles = styles.p_PasswordWrapper
        } else {
            passwordContainerStyles = styles.l_PasswordContainer
            passwordWrapperStyles = styles.l_PasswordWrapper
        }
        return (
            <ImageBackground source={bg} style={styles.bg}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    {headingText}
                    <DefaultButton
                        onPress={this.toggleAuthMode}
                        color='#29aaf4'
                        title={`Switch to ${authMode === 'signup' ? 'Login' : 'Sign Up'}`} />
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                value={email.value}
                                onChangeText={value => this.handleInputChange('email', value)}
                                valid={email.isValid}
                                touched={email.touched}
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                placeholder='Your email address' />
                            <View style={passwordContainerStyles}>
                                <View style={passwordWrapperStyles}>
                                    <DefaultInput
                                        value={password.value}
                                        onChangeText={value => this.handleInputChange('password', value)}
                                        valid={password.isValid}
                                        touched={password.touched}
                                        style={styles.input}
                                        secureTextEntry
                                        placeholder='Password' />
                                </View>
                                {authMode === 'signup' && (
                                    <View style={passwordWrapperStyles}>
                                        <DefaultInput
                                            value={confirmPassword.value}
                                            onChangeText={value => this.handleInputChange('confirmPassword', value)}
                                            valid={confirmPassword.isValid}
                                            touched={confirmPassword.touched}
                                            style={styles.input}
                                            secureTextEntry
                                            placeholder='Confirm password' />
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitSection}
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    bg: {
        width: '100%',
        flex: 1
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    headingContainer: {
        marginBottom: 15
    },
    p_PasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    l_PasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    p_PasswordWrapper: {
        width: '100%'
    },
    l_PasswordWrapper: {
        width: '48%'
    }
})

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading
})

const mapDispatchToProps = dispatch => ({
    tryAuth: (data, authMode) => dispatch(tryAuth(data, authMode)),
    authAutoSignIn: () => dispatch(authAutoSignIn())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)