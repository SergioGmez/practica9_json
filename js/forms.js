function removeChildsElement(element){

        for(var i=element.children.length-1; i>-1; i--){
                element.removeChild(element.children[i]);
            }
}

function createInput(labelIn, inputName, form){
        var dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
        
        var label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        label.appendChild(document.createTextNode(labelIn));
        dv.appendChild(label);
                
        var dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-4");
                
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", inputName);
                
        dv1.appendChild(input);
        dv.appendChild(dv1);
        form.appendChild(dv);
}
        
 function textArea(form){
        
        dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
                
        label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        label.appendChild(document.createTextNode("Descripción"));
        dv.appendChild(label);
                
        dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-4");
                
        input = document.createElement("textarea");
        input.setAttribute("rows", "5");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", "description");
                
        dv1.appendChild(input);
        dv.appendChild(dv1);
        form.appendChild(dv);
}

function createButton(func, form){
        dv = document.createElement("div");
        dv.setAttribute("class", "form-group");

        dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-offset-5");

        var a = document.createElement("a");
        a.appendChild(document.createTextNode("Enviar"));
        a.setAttribute("class", "btn btn-default");
        a.addEventListener("click", func());   

        dv1.appendChild(a);
        dv.appendChild(dv1);
        form.appendChild(dv);
}

function resultForm(result){
    var p = document.getElementById("result");
    
    if (result){
        p.setAttribute("style", "color:green");
        p.innerHTML = "Consulta realizada correctamente.";
    }else{
        p.setAttribute("style", "color:red");
        p.innerHTML = "Ha ocurrido un error.";
    }
}
        
function addCategoryForm(){
        function addCategory(){
              return function (){
                  var name = document.forms["catForm"]["title"].value;
                  var description = document.forms["catForm"]["description"].value;
                  
                  try{
                      if (name == "" || description == ""){
                         throw new EmptyValueException();
                       } else {
                             var cat = new Category(name);
                             sh.addCategory(cat);
                             cat.description = description;
                             resultForm(true);
                        } 
                   }catch(e){
                       resultForm(false);
                   } 
              }
        }
        
       return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
               
            createInput("Title", "title", form);
            textArea(form);
            createButton(addCategory, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}
    
function updCategoryForm(){
        
        function updCategory(){
              return function (){
                     var titleId = document.forms["catForm"]["titleId"].value;
                     var title = document.forms["catForm"]["title"].value;
                     var description = document.forms["catForm"]["description"].value;
                  
                     try{
                         if (title == "" || titleId == ""){
                          resultForm(false);
                          throw new EmptyValueException();
                         } else {
                              var cs = sh.categories;
                              var category = cs.next();
                              var aux = -1;

                              while (category.done !== true){
                                if (category.value.title === titleId ){
                                    aux = category.value;
                                }
                                category = cs.next();
                              } 

                             if (aux !== -1){
                                    aux.title = title;
                                    aux.description = description;
                                    resultForm(true);
                             } else {
                                    throw new CategoryNoExistsException();
                             }
                         }
                     } catch (e){
                         resultForm(false);
                     }
              }  
        }
        
        return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            createInput("Titulo de la categoria a actualizar", "titleId", form);
            createInput("Titulo", "title", form);
            textArea(form);
            createButton(updCategory, form);
            
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }
}
            
function delCategoryForm(){
    
        function delCategory(){
            return function (){
                
                var titleId = document.forms["catForm"]["titleId"].value;
                
                try{
                    if (titleId == ""){
                        throw new EmptyValueException();
                    } else {
                        var cs = sh.categories;
                        var category = cs.next();
                        var aux = -1;

                        while (category.done !== true){
                            if (category.value.title === titleId ){
                                aux = category.value;
                            }
                            category = cs.next();
                        } 

                        if (aux !== -1){
                            sh.removeCategory(aux);
                            resultForm(true);
                        } else {  
                             throw new CategoryNoExistsException();
                        }
                    }
                } catch (e) {
                    console.log(e);
                    resultForm(false);
                }
            }   
        }

        return function (){
            var divForm = document.getElementById("sct1");

            removeChildsElement(divForm);

            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            createInput("Titulo de la categoria a eliminar", "titleId", form);     
            createButton(delCategory, form);
            
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);

            divForm.appendChild(form);
        }
}
        
    

function addShopForm(){
        function addShop(){
              return function (){
                    var cif = document.forms["catForm"]["CIF"].value;
                    var name = document.forms["catForm"]["Name"].value;
                    var direction = document.forms["catForm"]["Direction"].value;
                    var phone = document.forms["catForm"]["Phone"].value;
                    
                  try{
                        if (cif == "" || name == ""){
                             throw new EmptyValueException();
                        } else {
                             var coord = new Coords(120, 111);
                             var shop = new Shop(cif, name, coord);
                             sh.addShop(shop);
                             shop.direction = direction;
                             shop.phone = phone;
                             resultForm(true); 
                        }
                  } catch(e) {
                      resultForm(false); 
                  }
                    
              }
        }
        
       return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
           
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form); 
            
            createButton(addShop, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
           
            divForm.appendChild(form);
      }
}


function updShopForm(){
      function updShop(){
          return function (){
                 
                 var cifId = document.forms["catForm"]["cifId"].value;
                 var cif = document.forms["catForm"]["CIF"].value;
                 var name = document.forms["catForm"]["Name"].value;
                 var direction = document.forms["catForm"]["Direction"].value;
                 var phone = document.forms["catForm"]["Phone"].value;
              
                 try{
                     if (cif == "" || cifId == ""){
                          throw new EmptyValueException();
                     } else {
                          var sp = sh.shops;
                          var shop = sp.next();
                          var aux = -1;

                          while (shop.done !== true){
                             if (shop.value.cif == cifId ){
                                 aux = shop.value;
                              }
                              shop = sp.next();
                          }

                          if (aux !== -1){
                                aux.cif = cif;
                                aux.name = name;
                                aux.direction = direction;
                                aux.phone = phone;
                                resultForm(true); 
                          } else {
                                throw new ShopNotExistsException();
                          }
                 }
                 } catch (e) {
                     resultForm(false);
                 }
          }  
    }    
        
      return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            createInput("CIF de la tienda a actualizar", "cifId", form);
            createInput("CIF", "CIF", form);
            createInput("Name", "Name", form); 
            createInput("Direction", "Direction", form); 
            createInput("Phone", "Phone", form); 

            createButton(updShop, form);
          
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }  
}




function delShopForm(){
    
        function delShop(){
            return function (){
                var cifId = document.forms["catForm"]["cifId"].value;
                
                try{
                   if (cifId == ""){
                        throw new EmptyValueException();
                    } else {
                        var sp = sh.shops;
                        var shop = sp.next();
                        var aux = -1;

                        while (shop.done !== true){
                            if (shop.value.cif == cifId ){
                                aux = shop.value;
                            }
                             shop = sp.next();
                        }

                        if (aux !== -1){
                            console.log(aux);
                            sh.removeShop(aux);
                            resultForm(true);
                        } else {
                             throw new ShopNotExistsException();
                        }
                    } 
                } catch (e){
                    console.log(e);
                    resultForm(false); 
                }
            }   
        }
    
        return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
            
            createInput("CIF de la tienda a eliminar", "cifId", form);
            
            createButton(delShop, form);
            
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
        }
}

function addProForm(){
    
    function addPro(){
      return function (){
            var serial = parseInt(document.forms["catForm"]["SerialNumber"].value);
            var name = document.forms["catForm"]["Name"].value;
            var description = document.forms["catForm"]["Description"].value;
            var price = parseInt(document.forms["catForm"]["Price"].value);
            var tax = document.forms["catForm"]["Tax"].value;
          
            try{
               if (serial == "" || name == ""){
                         
                     throw new EmptyValueException();
                } else {
                     var pro = new Product(serial, name, price);
                     sh.addProduct(pro, sh.defaultCategory);
                     pro.description = description;
                     pro.tax = tax;
                     resultForm(true);
                } 
            } catch (e) {
                resultForm(false);
            } 
      }
    }
    
       return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["SerialNumber", "Name", "Description", "Price", "Tax"];
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            createInput("SerialNumber", "SerialNumber", form);
            createInput("Name", "Name", form); 
            createInput("Description", "Description", form); 
            createInput("Price", "Price", form);
            createInput("Tax", "Tax", form);
           
            createButton(addPro, form);
           
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}



function delProForm(){
       function delPro(){
        return function (){
            function compareElements(element){
                 return (element.serialNumber == serial)
            }

            var serial = document.forms["catForm"]["serial"].value;

            try{
                if (serial == ""){
                    throw new EmptyValueException();
                } else {
                    index = sh.products.findIndex(compareElements);

                    if (index != -1){
                        sh.removeProduct(sh.products[index]);
                        resultForm(true);
                    }else{
                        throw new ProductNotExistsException("Product "+serial);
                    }
                }
            } catch (e){
                resultForm(false);
            }
        }   
    }     
    
    return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
           
            createInput("SerialNumber del producto a eliminar", "serial", form);
           
            createButton(delPro, form);
        
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}



function sesionForm(){
     return function (){
        
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
         
            createInput("Username", "user", form);
            createInput("Password", "pass", form);
         
            createButton(sesion, form);
         
            var p = document.createElement("p");
            p.setAttribute("id", "result");
            p.setAttribute("class", "h2");
            form.appendChild(p);
                
            divForm.appendChild(form);
      }
}

function sesion(){
     return function (){
          var user = document.forms["catForm"]["user"].value;
          var pass = document.forms["catForm"]["pass"].value;
          var p = document.getElementById("result");
         
          if (user === "prueba" && pass === "prueba"){
              document.cookie = "username=prueba";
              p.setAttribute("style", "color:green");
              p.innerHTML = "Has iniciado sesión.";
        }else{
              p.setAttribute("style", "color:red");
              p.innerHTML = "Usuario o contraseña incorrectos.";  
        }
    }
}

function closeSesion(){
     return function (){
          document.cookie = "username=; max-age=0";
     }
}