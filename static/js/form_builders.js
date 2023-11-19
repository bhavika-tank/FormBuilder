

$(function () {
    $('.offcanvas').offcanvas({
        show:true,
        keyboard: false,
        backdrop: 'static'
    });
});
$(function () {
    $('.modal').modal({
        show:true,
        keyboard: false,
        backdrop: 'static'
    });
});

var listOfTagAttributes = {};
var newListOfAttributes = {};
let get = (tag) => document.querySelector(tag);
let draggingTarget = null;

// window.setTimeout(function() {
//     $(".alert").fadeTo(500, 0).slideUp(500, function(){
//         $(this).remove(); 
//     });
// }, 3000);

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}

$(function () {
    $('.offcanvas').offcanvas({
        show:true,
        keyboard: false,
        backdrop: 'static'
    });
});
$(function () {
    $('.modal').modal({
        show:true,
        keyboard: false,
        backdrop: 'static'
    });
});

$(document).ready(function(){
    $("#reset").click(function(){
        $("#box2").empty();
    });
    $("#clpreview").click(function(){
        $("#preview").empty();
    });
});

function removeTabes(id){
    var li_id = document.getElementById(`li${id}`);
    var tabs_id = document.getElementById(`linkpills${id}`);
    li_id.remove();
    tabs_id.remove();
    console.log(id);
}

var tab_id = 0;
$("#add_tab_content").on("click", function(){

    tab_id ++;
    var nav_tab = document.getElementById('nav-tab');
    // var tabHtml = `<button class="nav-link " id="nav-tab${tab_id}" data-bs-toggle="tab" data-bs-target="#new-tab${tab_id}"
    // type="button" role="tab" aria-controls="nav-home" aria-selected="true">Tab ${tab_id}</button>`;
    var tabHtml = `<li class="nav-item px-2 mb-2 btn btn-outline-primary mx-1 tab_li" id="li${tab_id}"><a class="label-btn label-end px-4" data-bs-toggle="tab" href="#linkpills${tab_id}">Tab ${tab_id}</a> <i class="ri-close-line label-btn-icon ms-1 tab_close" onclick="removeTabes(${tab_id})"></i></li>`;

    var tab_content = document.getElementById('nav-tabContent'); 
    // var tabs = `<div class="tab-pane fade dropArea box2 card-body nav-home${tab_id}" id="new-tab${tab_id}" role="tabpanel" aria-labelledby="nav-profile-tab"></div>`
    var tabs = `<div class="tab-pane dropArea box2 nav-home border tabpen_min_hight" id="linkpills${tab_id}"></div>`
    
    var tab_content_div = document.createElement('div');
    tab_content_div.innerHTML = tabs;
    
    var tabContentElement = tab_content_div.firstChild;
    
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = tabHtml;
    
    var tabElement = tempDiv.firstChild;
    
    nav_tab.appendChild(tabElement);
    tab_content.appendChild(tabContentElement)
    

    const elements_d = document.querySelectorAll(".box2"); // Select all elements with a class of "droppable"
    const eventListeners_d = [];
    elements_d.forEach((element) => {
        const listener_d = element.addEventListener("dragover", handledragover);
        eventListeners_d.push(listener_d);
    });




    const elements = document.querySelectorAll(".box2"); // Select all elements with a class of "droppable"
    const eventListeners = [];
    elements.forEach((element) => {
        const listener = element.addEventListener("drop", handleDrop);
        eventListeners.push(listener);
    });

    // const newTab1_d = document.querySelector(".nav-home1");
    // newTab1_d.addEventListener("dragover", handledragover);
    
    
    // const newTab1 = document.querySelector("#new-tab");
    // newTab1.addEventListener("drop", handleDrop);
});

const elements_d = document.querySelectorAll(".box2"); // Select all elements with a class of "droppable"
const eventListeners_d = [];
elements_d.forEach((element) => {
    const listener_d = element.addEventListener("dragover", handledragover);
    eventListeners_d.push(listener_d);
});

const elements = document.querySelectorAll(".box2"); // Select all elements with a class of "droppable"
const eventListeners = [];
elements.forEach((element) => {
    const listener = element.addEventListener("drop", handleDrop);
    eventListeners.push(listener);
});


// For Priview Content
function getHtmlContent() {
    var element = document.getElementById('boxcontent');
    var htmlContent = element.innerHTML;
    
    var contentElement = document.createElement('div');
    contentElement.innerHTML = htmlContent;

    var contentChild = contentElement.children
    for(var i=0; i<contentChild.length; i++){
        
        if(contentChild[i].tagName == 'BUTTON'){
            contentChild[i].remove();
            contentChild[i].remove();
        }
        if(contentChild[i].tagName == 'DIV'){
            var innerchild = contentChild[i].children;
            for(var j=0; j<innerchild.length; j++){
                if(innerchild[j].tagName == 'SPAN'){
                    innerchild[j].remove();
                }
            }
        }
    }
    var previewContent = document.getElementById('preview');
    previewContent.appendChild(contentElement);
}

function ChangeElement(element) {

    var child = $(element).offsetParent().children();
    var btn = document.createElement('button');
    btn.setAttribute("class", "btn btn-warning my-3");
    btn.setAttribute("id", "elementSave");
    btn.textContent = "Apply";

    
    for (var i = 0; i < child.length - 1; i++){
        if(child[i].tagName == "SELECT"){
            var selects_id = child[i].id
        }
        var ele = document.getElementById('changer')
        var label = document.createElement('label');
        
        editOptions = {
            text: [
                'label',
                'placeholder',
                'id'
            ],
            password: [
                'label',
                'placeholder',
                'id'
            ],
            SELECT: [
                'label',
            ],
            textarea: [
                'label',
                'placeholder',
                'id'
            ],
            email: [
                'label',
                'placeholder'
            ],
            file: [
                'label',
            ],
            checkbox: [
                'label',
            ],
            radio: [
                'label',
            ]
            
        }
        for (const type in editOptions) {
            if (editOptions.hasOwnProperty(type)) {
                const options = editOptions[type];
                // console.log(`Options for ${type}:`);
                
                if(child[i].type == type){
                    
                    for (let j = 0; j < options.length; j++) {
                        const label = document.createElement('label');
                        // label.textContent = options[j];
                        label.setAttribute("class", "px-2 form-label pt-1 fw-bold");
                        if (j == 0){
                            label.textContent = "Label Title";
                        }else if(j == 1){
                            label.textContent = "Placeholder Name";
                        } else if(j == 2){
                            label.textContent = "Unique Id and Name";
                        }

                        const elementer = document.createElement('input');
                        elementer.setAttribute("class", "form-control");
                        elementer.setAttribute('id', 'input'+[j]); 

                        ele.appendChild(label);
                        ele.appendChild(elementer);
                        
                        
                        if(j == 2) {
                            var check_div = document.createElement('div');
                            check_div.setAttribute('class', 'form-check my-3');
                            ele.appendChild(check_div);

                            var checkBox = document.createElement('input');
                            var checkBox_label = document.createElement('label');
                            checkBox_label.setAttribute("class", "form-check-label fw-bold");
                            checkBox_label.textContent = "Required";
                            checkBox.setAttribute('class', 'form-check-input');
                            checkBox.setAttribute('type', 'checkbox');
                            checkBox.setAttribute('id', 'check_id');
                            check_div.appendChild(checkBox);
                            check_div.appendChild(checkBox_label);
                        }
                    }
                } else if (child[i].tagName == type){
                    for (let sel = 0; sel < options.length; sel++) {
                        const label = document.createElement('label');
                        // label.textContent = options[j];
                        label.setAttribute("class", "px-2 form-label pt-1 fw-bold");
                        if (sel == 0){
                            label.textContent = "Label Title";
                        }else if(sel == 1){
                            label.textContent = "Placeholder Name";
                        }

                        const elementer = document.createElement('input');
                        elementer.setAttribute("class", "form-control");
                        elementer.setAttribute('id', 'input'+[sel]); 

                        ele.appendChild(label);
                        ele.appendChild(elementer);
                        
                        
                        if(sel == 0) {
                            var check_div = document.createElement('div');
                            check_div.setAttribute('class', 'pt-2');
                            ele.appendChild(check_div);

                            var checkBox = document.createElement('input');
                            var checkBox_label = document.createElement('label');
                            checkBox_label.setAttribute("class", "form-check-label mx-5 fw-bold");
                            checkBox_label.textContent = "Required";
                            checkBox.setAttribute('class', 'form-check-input mx-1');
                            checkBox.setAttribute('type', 'checkbox');
                            checkBox.setAttribute('id', 'check_id');
                            check_div.appendChild(checkBox);
                            check_div.appendChild(checkBox_label);

                            var option_div = document.createElement('div');
                            option_div.setAttribute('class', 'pt-2');
                            option_div.setAttribute('id', 'op_id');

                            ele.appendChild(option_div);

                            var option_lbl = document.createElement('label');
                            option_lbl.setAttribute('class', 'px-2 form-label fw-bold');
                            option_lbl.textContent = "add Option";
                            option_div.appendChild(option_lbl);

                            var op_btn = document.createElement('button');
                            op_btn.setAttribute('class', 'btn btn-info');
                            op_btn.setAttribute('id', 'addOption');
                            op_btn.textContent = "+";
                            option_div.appendChild(op_btn);
                            
                            var select_content = document.getElementById(selects_id).children;
                            var sel_val=0;
                            for(sel_val=0;sel_val<select_content.length;sel_val++) {
                                
                                var op_div = document.getElementById('op_id');
                                var new_op_div = document.createElement('div');
                                new_op_div.setAttribute('id', 'op_btn'+sel_val);
                                op_div.appendChild(new_op_div);
                                var op_input = document.createElement('input');
                                op_input.setAttribute('type', 'text');
                                op_input.setAttribute('class', 'form-control mt-2');
                                op_input.setAttribute('id', 'op_input'+[sel_val]);
                                op_input.setAttribute('value', select_content[sel_val].value);
                                new_op_div.appendChild(op_input);
                                var op_btn = document.createElement('button');
                                op_btn.setAttribute('class', 'btn divbtn');
                                op_btn.setAttribute('id', 'op_btn'+[sel_val]);
                                op_btn.textContent = "-";
                                new_op_div.appendChild(op_btn);
                                
                                
                                $(op_btn).on('click', function(){
                                    var parentDivId = $(this).parent().attr('id');
                                    $('#' + parentDivId).remove();
                                });
                                
                                
                            }
                            var op_input_id = 0;
                            $('#addOption').on('click', function(){
                                op_input_id++;
                                var op_div = document.getElementById('op_id');
                                var new_op_div = document.createElement('div');
                                new_op_div.setAttribute('id', 'op_btn'+sel_val);
                                op_div.appendChild(new_op_div);
                                var op_input = document.createElement('input');
                                op_input.setAttribute('type', 'text');
                                op_input.setAttribute('class', 'form-control mt-2');
                                op_input.setAttribute('id', 'op_input'+[sel_val]);
                                new_op_div.appendChild(op_input);
                                var op_btn = document.createElement('button');
                                op_btn.setAttribute('class', 'btn divbtn');
                                op_btn.setAttribute('id', 'op_btn'+[sel_val]);
                                op_btn.textContent = "-";
                                new_op_div.appendChild(op_btn);
                                
                                
                                $(op_btn).on('click', function(){
                                    var parentDivId = $(this).parent().attr('id');
                                    $('#' + parentDivId).remove();
                                });
                                sel_val++;
                            });

                        }
                    }
                }
            }
        }
        
        
        $("#clear").on('click', function(){
            $(".offcanvas-body").empty();
        });
    }
    ele.appendChild(btn)
    $('#elementSave').on('click', function(){
        var label_val = $('#input0').val();
        var placeholder_val = $('#input1').val();
        var id_name_val = $('#input2').val();
        var Required_val = document.getElementById('check_id');

        
        var eleChild = $(element).offsetParent().children();
        for(var ele = 0; ele < eleChild.length; ele++) {
            var TagName = eleChild[ele].tagName;
            if (TagName == "INPUT" || TagName == "TEXTAREA" ) {
                eleChild[ele].placeholder = placeholder_val;
                eleChild[ele].id = id_name_val;
                eleChild[ele].name = id_name_val;
                // CHECK BOX ISSUE PANDING
                if(Required_val.checked) {
                    eleChild[ele].required = "true";
                } else {
                    eleChild[ele].required = "false";
                }
            } else if (TagName == "LABEL"){
                eleChild[ele].textContent = label_val;
            } else if (TagName == "SELECT"){
                selects_id = eleChild[ele].id;
                var op_tag = eleChild[ele].children;

                for (var j = op_tag.length - 1; j >= 0; j--) {
                    
                    if (op_tag[j].tagName == 'OPTION') {
                        op_tag[j].remove();
                    }
                }
            }
            
        }
        // element.children[0].textContent = label_val;
        // element.children[1].placeholder = placeholder_val;


        var sel_div_id = document.getElementById('op_id').children;
        
        for(var i = 2; i < sel_div_id.length; i++) {
            var innerOPChild = sel_div_id[i].children;
            
            for(var j = 0; j < innerOPChild.length; j++){
                
                if(innerOPChild[j].tagName == "INPUT"){
                    var op_val = document.getElementById(innerOPChild[j].id).value;
                    
                    var select_content = document.getElementById(selects_id);
                    var createOption = document.createElement("option");
                    createOption.setAttribute("value", op_val);
                    createOption.textContent = op_val;
                    select_content.appendChild(createOption);
                }
            }
        }

    });
}

function RemoveElement(element) {
    // $(element).parent('div').remove();
    $(element).parent().parent().remove();
    // element.remove();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    // console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // console.log(data);
    ev.target.appendChild(document.getElementById(data));
}


// =================================================================================

const col_elements_d = document.querySelectorAll(".colelement");
const col_eventListeners_d = [];
col_elements_d.forEach((element) => {
    element.addEventListener("dragstart", handleColDragStart);
    element.addEventListener("dragover", handleColDragover);
    element.addEventListener("drop", handleColDrop);
});

function handleColDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function handleColDragover(event) {
    event.preventDefault();
    console.log('dragover-' + event);
}

function handleColDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const target = event.target;
    
    // console.log("data",document.getElementById(data));
    // console.log("target_id", $(target).closest('div.row'));
    $(target).closest('div.row').each((index, ele) => {
        // var colEle = `<div class="col colelement" name="textinput" id="clone_${data}" draggable="true">${document.getElementById(data).innerHTML}</>`;
        // $(ele).append(colEle);
        // // $(ele).append(clone_element);
        // $("#" + data).remove();
        // if($("#row_" + data).children().length == 0) {
        //     $("#row_" + data).remove();
        // }
        // if($(ele).children().length < 2) {

        // }
        var colEle = document.getElementById(data)
        $(ele).append(colEle);
        $("#", data).remove();
        if($("#row_" + data).children().length == 0){
            $("#row_" + data).remove();
        }
    });

}

// =================================================================================
//-------------------------
document.addEventListener("dragstart", function (event) {
    draggingTarget = event.target;
    // console.log(draggingTarget);
});


function handledragover(event) 
{
    event.preventDefault();
    // console.log('dragover-'+event);
}


var newTargetId = 0;

function handleDrop(event) 
{
    if($(draggingTarget).attr('class').includes('colelement')) {
        return false;
    }
    // console.log("event => ", $(draggingTarget).attr('class'));
    
    newTargetId++;

    // var newColumn = document.createElement("div");
    // newColumn.classList.add("row");
    // newColumn.classList.add("d-flex");
    // newColumn.setAttribute("id", `row_id_${newTargetId}`);
    // // newColumn.classList.add("colelement");
    // // newColumn.setAttribute("ondrop", "drop(event)");
    // // newColumn.setAttribute("ondragover", "allowDrop(event)");

    // // Your code to handle the "drop" event goes here
    // // You can access information about the event using the 'event' parameter
    // let newTarget = draggingTarget.cloneNode(true);
    
    // newTarget.id = "id_" + newTargetId;
    // newTarget.classList.remove('boxbdr');
    // // newTarget.removeAttribute('draggable');
    // newTarget.setAttribute('class', 'col colelement')
    // // newTarget.setAttribute('draggable', 'true')
    // // newTarget.setAttribute('ondragstart', 'drag(event)')

    

    // var btnContainer = document.createElement("span");
    // btnContainer.setAttribute("class", "d-flex")
    // btnContainer.innerHTML = `<div class="p-2" onclick="RemoveElement(this)"><span class="" style="cursor: pointer; color:red"><i class="fe fe-trash"></i></span></div>
    //                         <div class="p-2"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasRight" onclick="ChangeElement(this)"><span class=" style="cursor: pointer;"><i class="fe fe-edit"></i></span></div>`;
    // // this.appendChild(newTarget);
    // // newTarget.appendChild(btnContainer);


    // newColumn.appendChild(newTarget);
    // newTarget.appendChild(btnContainer);

    // // Append the new column to the container (e.g., .box2)
    // this.appendChild(newColumn);

    
    // var formElement = document.getElementById(`${newTarget.id}`);
    
    // // console.log(formElement);
    // // var formChildAttributes = formElement.children;
    
    // var childNodeslist = formElement.childNodes

    // for(var i=0; i<childNodeslist.length; i++){
        
    //     if(childNodeslist[i].className == "input-group"){
    //         var innerchild = childNodeslist[i].childNodes
    //         for(var chList=0; chList<innerchild.length; chList++){
    //             if(innerchild[chList].nodeName == "INPUT"){
    //                 const innerCH = innerchild[chList];
    //                 innerCH.removeAttribute('disabled');
    //             }
    //         }
    //     } else if (childNodeslist[i].nodeName === 'INPUT' ){
    //         var child = childNodeslist[i];
    //         child.removeAttribute('disabled');
    //     } else if (childNodeslist[i].nodeName === 'TEXTAREA' ){
    //         var child = childNodeslist[i];
    //         child.removeAttribute('disabled');
    //     } else if (childNodeslist[i].nodeName === 'SELECT' ){
    //         var child = childNodeslist[i];
    //         child.setAttribute('id', 'sel_id'+newTargetId);
    //         child.removeAttribute('disabled');
    //     }
    // }

    // const col_elements_d = document.querySelectorAll(".colelement"); // Select all elements with a class of "colelement"
    // const col_eventListeners_d = [];
    // col_elements_d.forEach((element) => {
    //     element.addEventListener("dragstart", handleColDragStart); // Add a "dragstart" event listener for dragging
    //     element.addEventListener("dragover", handleColDragover);
    //     element.addEventListener("drop", handleColDrop);
    // });

    $(event.target).closest('div.row').each((index, ele) => {
        if(ele.className == "row d-flex"){

            var New_clone_element = draggingTarget.cloneNode(true);
            New_clone_element.id = "id_" + newTargetId;
            New_clone_element.classList.remove('boxbdr');
            New_clone_element.setAttribute('class', 'col colelement');

            var new_btnContainer = document.createElement("span");
            new_btnContainer.setAttribute("class", "d-flex")
            new_btnContainer.innerHTML = `<div class="p-2" onclick="RemoveElement(this)"><span class="" style="cursor: pointer; color:red"><i class="fe fe-trash"></i></span></div>
                                    <div class="p-2"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasRight" onclick="ChangeElement(this)"><span class=" style="cursor: pointer;"><i class="fe fe-edit"></i></span></div>`;
            

            var target_element_id = document.getElementById(ele.id);
            New_clone_element.appendChild(new_btnContainer);
            target_element_id.appendChild(New_clone_element);

            var formElement = document.getElementById(`${New_clone_element.id}`);

            // console.log(formElement);
            // var formChildAttributes = formElement.children;

            var childNodeslist = formElement.childNodes

            for (var i = 0; i < childNodeslist.length; i++) {

                if (childNodeslist[i].className == "input-group") {
                    var innerchild = childNodeslist[i].childNodes
                    for (var chList = 0; chList < innerchild.length; chList++) {
                        if (innerchild[chList].nodeName == "INPUT") {
                            const innerCH = innerchild[chList];
                            innerCH.removeAttribute('disabled');
                        }
                    }
                } else if (childNodeslist[i].nodeName === 'INPUT') {
                    var child = childNodeslist[i];
                    child.removeAttribute('disabled');
                } else if (childNodeslist[i].nodeName === 'TEXTAREA') {
                    var child = childNodeslist[i];
                    child.removeAttribute('disabled');
                } else if (childNodeslist[i].nodeName === 'SELECT') {
                    var child = childNodeslist[i];
                    child.setAttribute('id', 'sel_id' + newTargetId);
                    child.removeAttribute('disabled');
                }
            }
            
        }
        else {
            var newColumn = document.createElement("div");
            newColumn.classList.add("row");
            newColumn.classList.add("d-flex");
            newColumn.setAttribute("id", `row_id_${newTargetId}`);
            // newColumn.classList.add("colelement");
            // newColumn.setAttribute("ondrop", "drop(event)");
            // newColumn.setAttribute("ondragover", "allowDrop(event)");

            // Your code to handle the "drop" event goes here
            // You can access information about the event using the 'event' parameter
            let newTarget = draggingTarget.cloneNode(true);

            newTarget.id = "id_" + newTargetId;
            newTarget.classList.remove('boxbdr');
            // newTarget.removeAttribute('draggable');
            newTarget.setAttribute('class', 'col colelement')
            // newTarget.setAttribute('draggable', 'true')
            // newTarget.setAttribute('ondragstart', 'drag(event)')



            var btnContainer = document.createElement("span");
            btnContainer.setAttribute("class", "d-flex")
            btnContainer.innerHTML = `<div class="p-2" onclick="RemoveElement(this)"><span class="" style="cursor: pointer; color:red"><i class="fe fe-trash"></i></span></div>
                            <div class="p-2"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasRight" onclick="ChangeElement(this)"><span class=" style="cursor: pointer;"><i class="fe fe-edit"></i></span></div>`;
            // this.appendChild(newTarget);
            // newTarget.appendChild(btnContainer);


            newColumn.appendChild(newTarget);
            newTarget.appendChild(btnContainer);

            // Append the new column to the container (e.g., .box2)
            this.appendChild(newColumn);


            var formElement = document.getElementById(`${newTarget.id}`);

            // console.log(formElement);
            // var formChildAttributes = formElement.children;

            var childNodeslist = formElement.childNodes

            for (var i = 0; i < childNodeslist.length; i++) {

                if (childNodeslist[i].className == "input-group") {
                    var innerchild = childNodeslist[i].childNodes
                    for (var chList = 0; chList < innerchild.length; chList++) {
                        if (innerchild[chList].nodeName == "INPUT") {
                            const innerCH = innerchild[chList];
                            innerCH.removeAttribute('disabled');
                        }
                    }
                } else if (childNodeslist[i].nodeName === 'INPUT') {
                    var child = childNodeslist[i];
                    child.removeAttribute('disabled');
                } else if (childNodeslist[i].nodeName === 'TEXTAREA') {
                    var child = childNodeslist[i];
                    child.removeAttribute('disabled');
                } else if (childNodeslist[i].nodeName === 'SELECT') {
                    var child = childNodeslist[i];
                    child.setAttribute('id', 'sel_id' + newTargetId);
                    child.removeAttribute('disabled');
                }
            }

            const col_elements_d = document.querySelectorAll(".colelement"); // Select all elements with a class of "colelement"
            const col_eventListeners_d = [];
            col_elements_d.forEach((element) => {
                element.addEventListener("dragstart", handleColDragStart); // Add a "dragstart" event listener for dragging
                element.addEventListener("dragover", handleColDragover);
                element.addEventListener("drop", handleColDrop);
            });
        }
    });
}
// document.querySelector("#nav-home").addEventListener("drop", handleDrop);
// document.querySelector("#new-tab1").addEventListener("drop", handleDrop);

// Get references to both elements by their IDs
// const navHome = document.querySelector("#nav-home");
// const newTab1 = document.querySelector("#nav-home1");

// // Add a "drop" event listener to both elements and use the same callback function
// navHome.addEventListener("drop", handleDrop);
// newTab1.addEventListener("drop", handleDrop);

// =================================================================================
