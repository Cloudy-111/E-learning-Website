import image from '../../assets/image_resources/image.png'
import '../../assets/styles/pages/_register.scss'
import FormRegister from '../../components/FormRegister'


function RegisterPage(){

    return (
        <div className='wrapper'>
            <div className='container'>
                <div className="left-side">
                    <img src={image} alt='E-learning'/>
                </div>
                <div className="right-side">
                    <FormRegister 
                        username = "username"
                        email = "email"
                        password = "password"
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage