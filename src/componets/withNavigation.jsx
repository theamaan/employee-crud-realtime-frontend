import {useNavigate} from "react-router-dom";
function withNavigaiton(Component){
    return props => <Component {...props} navigate = {useNavigate()}/>
}
export default withNavigaiton;