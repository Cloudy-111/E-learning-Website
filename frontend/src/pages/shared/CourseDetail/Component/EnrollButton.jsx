import { useNavigate } from "react-router-dom";
import { postEnrollCourse } from "../../../../api/enrollments.api";
import { isLoggedIn } from "../../../../utils/auth";
import { Primary } from "../../../../components/Buttons";

const EnrollButton = ({courseId, isEnrolledState}) => {
    
    const navigate = useNavigate();

    const handleEnroll = async () => {
        if(!isLoggedIn()){
            return navigate('/login');
        }

        try {
            await postEnrollCourse(courseId);
            alert("Ghi danh thành công!");
            window.location.reload();
        } catch (err) {
            alert(err);
        }
    }

    if (isEnrolledState === null) return null;
    if (isEnrolledState) return null;

    return (
        <Primary className="w-full mt-4" onClick={handleEnroll}>
        Ghi danh ngay
        </Primary>
    );
}

export default EnrollButton;