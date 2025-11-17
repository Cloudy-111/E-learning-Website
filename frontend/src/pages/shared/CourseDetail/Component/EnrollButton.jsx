import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postEnrollCourse, isEnrolled } from "../../../../api/enrollments.api";
import { isLoggedIn } from "../../../../utils/auth";
import { Primary } from "../../../../components/Buttons";

const EnrollButton = ({courseId}) => {
    const [isEnrolledState, setIsEnrolledState] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkEnrollment = async () => {
            try {
                const result = await isEnrolled(courseId);
                setIsEnrolledState(result.data.isEnrolled);
            } catch (err) {
                console.error(err);
                setIsEnrolledState(false);
            }
        };

        checkEnrollment();
    }, [courseId]);

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