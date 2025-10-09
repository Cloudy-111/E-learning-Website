import image from '../../assets/image_resources/image.png'
import FormLogin from '../../components/Form/FormLogin'

function LoginPage(){
    return (
        <div className='wrapper'>
            <div className='container'>
                <div className="left-side">
                    <img src={image} alt='E-learning'/>
                </div>
                <div className="right-side">
                    <FormLogin
                        email = "email"
                        password = "password"
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage