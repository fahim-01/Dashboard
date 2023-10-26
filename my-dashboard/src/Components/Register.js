import react, { useEffect } from 'react';
import { useRef,useState } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register =() => {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser]= useState('')
    const [ValidName, setValidName] = useState(false)
    const [focusUser, setFocusUser] = useState(false)
    
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [focusPwd, setFocusPwd] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatchPwd, setValidMatchPwd] = useState(false)
    const [ focusMatchPwd, setFocusMatchPwd] = useState(false)

    const [ errMsg, setErrMsg] = useState('')
    const [ success, setSuccess] =  useState(false)
    
    useEffect(()=> {
        useRef.current.focus();
    },[])
    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    },[user])
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatchPwd(pwd===matchPwd)
    },[pwd,matchPwd])
    useEffect(()=> {
        setErrMsg('')
    },[user,pwd,matchPwd])
 return(
    <section>
        <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form>
            <label htmlFor='username'>
              Username:
              <span className={ValidName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={ValidName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input
               type="text"
               id='username'
               ref={userRef}
               onChange={(e) => setUser(e.target.value)}
               required
               aria-invalid = {ValidName ? "false" : "true"}
               aria-describedby='uidnote'
               onFocus={setFocusUser(true)}
               onBlur={setFocusUser(false)}
            />
            <p id='uidnote' className={focusUser && user && !ValidName ? "instruction" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
            </p>
        </form>
    </section>
 )
}



export default Register;