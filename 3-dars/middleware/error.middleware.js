const CustomErrorHandler = require("../error/custom-error.handler")

// next nega kerak, yoki endi kelamizmi u yerga?
module.exports = function(err, req, res, next){
    if(err instanceof CustomErrorHandler){
      return res.status(err.status || 400).json({
        message: err.message,
        errors: err.errors
      })
    }
  
    // ERRORS bor yo'qligini tekshirish ham kerak ekan
    if(err.name = "ValidationsError" && err.errors){
      const ValidationErrors = Object.values(err.errors).map(v=>v.message)
  
      return res.status(400).json({
        errName: "ValidationsError",
        errors: ValidationErrors
      })
    }else if(err.name = "ValidationsError"){
      console.log(err)
      return res.status(400).json({
        errName: "ValidationsError",
        errors: err.message
      })
    }
    
    console.log(err)
    return res.status(500).json({message: err.message, name: err.name})

}