from flask import Flask, render_template, url_for, request
from math import sin,cos,tan,sqrt



app = Flask(__name__)

#route = link = url

#main route
@app.route("/")
def main(): #function
    return render_template("final.html")

@app.route("/simple")
def simple():
    return render_template("simple.html")

@app.route("/advance")
def advance():
    return render_template("advance.html")

@app.route("/calculate", methods=["post"])
def calculate():
    
    firstnumber= int(request.form["firstnumber"])
    secondnumber= int(request.form["secondnumber"])
    operation= request.form["operation"]
    color = "alert-success" 
    if operation == "plus" :
        result = firstnumber + secondnumber 
        note = "Addition was performed sucessfully"   
        
        
    elif operation == "minus":
        result = firstnumber - secondnumber    
        note = "Subtraction was performed sucessfully"    


    elif operation == "divide":
        result = firstnumber / secondnumber     
        note = "Divide was performed sucessfully"    
        
    elif operation == "multiply":
        result = firstnumber * secondnumber    
        note = "Multiplication was performed sucessfully"    
        
    else:
        note = "Nothing was performed sucessfully" 
        color= "alert-danger"   
        return render_template("simple.html", note=note)
       
           

    return render_template("simple.html", result=result, note=note, color=color)


@app.route("/calculate_advance", methods=["post"])
def advance_calculate():
    operation = request.form["operation"]
    number = int(request.form["number"])
    color = "alert-success"
    try:
        if operation == "sin":
            result= sin(number)
            note = "Sine was performed sucessfully"
        elif operation == "cos":
            result = cos(number)
            note = "Cosine was performed sucessfully"
        elif operation == "tan":
            result = tan(number)
            note = "Tangent was performed sucessfully"
        elif operation =="squr":
            result = sqrt(number)
            note = "Square root was performed sucessfully"
        else:
            note = "Nothing was performed sucessfully"
            color = "alert-danger"
            return render_template("advance.html",note=note,color=color)        
    except ValueError:
        return render_template("advance.html",result="0",note="Math Error",color="alert-danger")

    return render_template("advance.html",result=result,note=note,color=color)


# ----------------------------------------for final calculator ------------------------------------------
@app.route("/calculator")
def final():
    return render_template("final.html")


@app.route('/process', methods=['POST']) 
def process(): 
    data = request.get_json() # retrieve the data sent from JavaScript 
    # process the data using Python code 
    return render_template("final.html", data=data) # return the result to JavaScript 

@app.route('/process1', methods=['POST']) 
def calculation():
    result = request.get_json()
    return render_template("final.html",result=result)    

#------------------------------------------------------------------------------------------------------
if __name__ == "__main__" :
    app.run(debug= True)

