import { useNavigate } from 'react-router-dom';
import Button from '../../widgets/Button';
import Input from '../../widgets/Input';
import Label from '../../widgets/Label';
import './Login.scss';
import InputWithLabel from '../../components/Input';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { login, signUp } from '../../services/userService';
import { enqueueSnackbar } from 'notistack';
import { validateEmail } from '../../utils/validations/emailValidation';
import primaryLogo from '../../assets/images/primary-logo.png'

const Login = ({ type }: any) => {
    const SIGNIN = type === 'login';
    const { setLogInUser } = useUserContext()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const defaultRegistrationData = {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        roles: [],
        profileImage: "https://example.com",
        companyDetails: {
            name: "",
            registration: "",
            zipCode: "",
            city: "",
            country: "",
            street: '',
            phoneNo: "",
            state: ""
        },
    };
    
    const [registrationData, setRegistrationData] = useState<any>(defaultRegistrationData);

    useEffect(()=>{
        setRegistrationData(defaultRegistrationData);
    },[SIGNIN])

    const signIn = async (e: any) => {
        e.preventDefault();
        // validation 
        if (!username)
            return enqueueSnackbar("Username cannot be empty", { variant: "error" });
        if (!password)
            return enqueueSnackbar("password cannot be empty", { variant: "error" })
        const { data, status, message } = await login({
            emailOrUserName : username,
            password
        })
        if (status && data) {
            enqueueSnackbar("Login successful", { variant: 'success' });
            setLogInUser(data);
            navigate('/dashboard');
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    }

    const onRegister = async (e: any) => {
        e.preventDefault();
        const registerDto = { ...registrationData };
        // perform validation
        if (!validateRegistrationFormData(registerDto))
            return;
        delete registerDto.confirmPassword
        const { status, data } = await signUp(registerDto);
        if (status && data) {
            enqueueSnackbar("signUp successfull!", { variant: 'success' });
            navigate('/login');
        } else {
            if(data.message){
                enqueueSnackbar(data.message, { variant: 'error' });
            }
            else if (data.errors[0].property === 'password')
                enqueueSnackbar('password is not strong enough', { variant: 'error' })
            else
                enqueueSnackbar("signUp failed!", { variant: 'error' });
        }
    }

    const onUsernameChange = (e: any) => {
        setUsername(e.target.value);
        setError(false)
    }

    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
        setError(false)
    }

    const setFormFieldData = (fieldName: string, value: any) => {
        if (fieldName === 'roles') {
            let roles = registrationData.roles;
            if (roles.some((role: string) => role === value)) {
                // filter role
                roles = roles.filter((role: string) => role !== value);
            } else
                roles.push(value);

            value = roles;
        } else if (fieldName.includes('.')) {
            const [parentField, subField] = fieldName.split('.');
            fieldName = parentField;
            value = {
                ...registrationData[parentField],
                [subField]: value,
            }
        }
        const data = {
            ...registrationData,
            [fieldName]: value,
        }
        setRegistrationData(data);
    }

    const validateRegistrationFormData = (registrationFormData: any) => {
        if (!registrationFormData.firstName) {
            enqueueSnackbar("Please enter first name", { variant: "error" });
            return false;
        }

        if (!registrationFormData.lastName) {
            enqueueSnackbar("Please enter last name", { variant: "error" });
            return false;
        }

        if (!registrationFormData.email || !validateEmail(registrationFormData.email)) {
            enqueueSnackbar("Please enter valid email", { variant: "error" });
            return false;
        }

        if (!registrationFormData.userName) {
            enqueueSnackbar("Please enter username", { variant: "error" });
            return false;
        }

        if (!registrationFormData.password) {
            enqueueSnackbar("Please enter password", { variant: "error" }); // no. validation
            return false;
        }

        if (registrationFormData.password.length < 8) {
            enqueueSnackbar("Password should have mininum 8 characters", { variant: "error" }); // no. validation
            return false;
        }

        if (!registrationFormData.confirmPassword) {
            enqueueSnackbar("Please enter confirm password", { variant: "error" }); // no. validation
            return false;
        }

        if (registrationData.password !== registrationData.confirmPassword) {
            enqueueSnackbar("Password didn't matched", { variant: 'error' });
            return false;
        }

        return true;
    }

    return (<div className="login-container bg-slate-900">
        <div className='login-left-section'>
            <div className='flex flex-col items-center max-w-[356px] text-gray-100 text-center pb-14'>
                <img src={primaryLogo} alt='kigentechLogo' />
                <h1>Register & <br />"Be a Part of the Coinnewgems."</h1>
                <span>You are just a few steps away from creating your account.</span>
            </div>
        </div>

        <div className={`login-right-section`}>
            <div className={`form-container ${SIGNIN ? '' : "scale-95"}`}>
                <div className='flex items-center justify-between'>
                    <h1 className={`text-gray-100 font-bold text-4xl text-[44px] text-center font-lato`}>{SIGNIN ? "Login" : "Registration"}</h1>
                    <div className='flex text-sm font-lato font-bold gap-2'><p className='text-gray-100 '>{SIGNIN ? "Don't Have an Account?" : "Already Have an Account?"}</p> <span onClick={() => SIGNIN ? navigate('/register') : navigate('/login')} className='text-gray-200 cursor-pointer'>{SIGNIN ? "Register" : "Log In"}</span></div>
                </div>
                <form onSubmit={signIn} className={`flex gap-4 flex-col items-end min-w-[521px] pt-[43px]`}>
                    {SIGNIN ? (<>
                        <InputWithLabel vertical={true} label='Username' value={username} onChange={onUsernameChange} placeholder='Username' type='text' />
                        <div className='flex flex-col gap-1 w-full'>
                            <div className='flex justify-between items-center'>
                                <Label value='Password' />
                                <span className='text-xs font-lato font-medium cursor-pointer text-gray-300'>Forgot Password</span>
                            </div>
                            <Input style={'bg-slate-800 text-gray-100 rounded-md'}  value={password} onChange={onPasswordChange} placeholder='password' type='password' />
                        </div>
                        <div className={`flex w-full ${error ? 'justify-between' : "justify-end"}`}>
                            {error && <span className='px-2 font-lato font-normal text-sm text-[red]'>Incorrect username or password</span>}
                            <Button variant='darkgold' name={'Login'} onClick={signIn} type='submit' />
                        </div>
                    </>) :
                        (<>
                            <div className='flex w-full min-w-[721px] gap-8'>
                                <div className='flex flex-col flex-1 gap-3'>
                                    <InputWithLabel vertical={true} label='First Name' onChange={(e) => { setFormFieldData('firstName', e.target.value) }} placeholder='First Name' type='text' />
                                    <InputWithLabel vertical={true} label='Last Name' onChange={(e) => { setFormFieldData('lastName', e.target.value) }} placeholder='Last Name' type='text' />
                                    
                                  
                                    <InputWithLabel vertical={true} label='Email' onChange={(e) => { setFormFieldData('email', e.target.value) }} placeholder='Email' type='email' />
                                </div>
                                <div className='flex flex-col flex-1 gap-3'>
                                    <InputWithLabel vertical={true} label='Username' onChange={(e) => { setFormFieldData('userName', e.target.value) }} placeholder='Username' type='text' />
                                    <InputWithLabel vertical={true} label='Password' onChange={(e) => { setFormFieldData('password', e.target.value) }} placeholder='Password' type='password' />
                                    <InputWithLabel vertical={true} label='Confirm Password' onChange={(e) => { setFormFieldData('confirmPassword', e.target.value) }} placeholder='Confirm Password' type='password' />
                                </div>
                            </div>

                            <div className='flex gap-[23px]'>
                                <Button name={"Register"} variant="primary" onClick={onRegister} type='submit' />
                                <Button variant='secondary' color='secondary' onClick={() => { navigate('/login') }} name={'Cancel'} />
                            </div>
                        </>
                        )}
                </form>
            </div>
        </div>
    </div>)
};

export default Login;