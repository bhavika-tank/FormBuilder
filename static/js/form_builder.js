
console.log(document.getElementsByClassName('container')[0].childNodes[1].childNodes[3].childNodes[3]);
const content = document.getElementsByClassName('container')[0].innerHTML;
document.getElementById('container').style='white-space: pre-wrap;';
// document.getElementById('codecontainer').textContent = content;

$('.card').ready(function(){
    $('#codecontainer').append().text(content);
})

function remove(){

}

function add_textInput(){
    const element = `<div class="input-group mb-3" >
                        <label for="exampleInputEmail1" class="form-label" style="padding-right: 10px;">TextInput</label>
                        <input type="text" class="form-control" placeholder="Text Input">
                        <div class="px-2"><span class="input-group-text p-2" style="cursor: pointer; color:red"><i class="fa fa-trash"></i></span></div>
                    </div>`
    document.getElementById('elementcontent').innerHTML+=element;
}


function add_passwordInput(){
    const element = `<div class="input-group mb-3" >
                        <label for="exampleInputEmail1" class="form-label" style="padding-right: 10px;">PasswordInput</label>
                        <input type="password" class="form-control" placeholder="Password Input">
                        <div class="px-2"><span class="input-group-text p-2" style="cursor: pointer; color:red"><i class="fa fa-trash"></i></span></div>
                    </div>`
    document.getElementById('elementcontent').innerHTML+=element;
}