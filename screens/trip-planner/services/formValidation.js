export default function formValidation(formValues){
    const result ={
        name:validateName(formValues.name),
        phone:validatePhone(formValues.phone),
        adult:validateAdult(formValues.adult),
        child:validateChild(formValues.child)
    }

    let field
    let isValid = true
   for(field in result){
       isValid = isValid && result[field]
   }
    return {result,isValid}

}

const otherFunction = ()=>{
    return "Sam"
}
const validateName = (name)=>{
    return name&&name.length>3? true: false

}
const validatePhone = (phone)=>{
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone)

}
const validateAdult = (adult)=>{
    return adult > 0 ? true : false

}
const validateChild = (child)=>{
            return child >= 0 ? true : false
}


