import { EMPLOYEES } from "./MOCK_DATA.js";
import removeVietnameseTones from "./removeVietnameseTones.js";
// element
const previous = document.querySelector(".pager_previous");
const next = document.querySelector(".pager_next");
const upValue = document.querySelector(".manager_content .manager_items");
const pager_value= document.querySelector(".pager_counter .pager-value");
const pager_limit= document.querySelector(".pager_counter .pager_limit");
const inputSearch = document.querySelector(".search .employess__input");
const sortValue = document.querySelector('.filter');
const inputItem = document.querySelector('.left_input');
const emailItem = document.querySelector('.left_email');
const jobItem = document.querySelector('.left_job');
const countItem = document.querySelector('.left_count');
const addItem = document.querySelector('.left_btn');

// Array render
let resultValue=[];
// Count page
let count =1 ; 
// Number page
let x=40;
// Length EMPLOYEES
pager_limit.innerHTML = EMPLOYEES.length

// Pagination
const pagerCount = (value,n,x=40)=>{ 
    const valueSlice = value.slice((n-1)*x,(n-1)*x + x);
    return valueSlice
}
const renderData = (datas)=>{
    const valueResult = datas.map((data)=>{
        return (`<div class="information_item">
        <div class="kanban_image">
            <img src="./assets/img/img.jpg" alt="Minh Hoang">
            <div class="kanban_icons">
                <span class="kanban_messages">
                    <i class="fas fa-comments"></i>
                    16
                </span>
                <span class="kanban_followers">
                    <i class="fas fa-cloud-meatball"></i>
                    16
                </span>
            </div>
            
        </div>
        <div class="kanban_detail">
            <div class="kanban_record-top">
                <div class="kanban_record-title">
                    ${data.name||"Noname"}
                </div>
                <li>${data.job||"Null"}</li>
            </div>
            <ul class="kanban_information">
                <li>
                    <i class="fas fa-envelope"></i>
                    <span>${data.email||"Null"}</span>
                </li>
                <li>
                    <i class="fas fa-phone-alt"></i>
                    <span>0981287660</span>
                </li>
            </ul>
            <button class="kanban_follow">Follow</button>
        </div>
    </div>`)
    }).join('')
    return valueResult;
}
// Render 
function renderResult(data,count){
    resultValue = [...pagerCount(data,count,x)];
    upValue.innerHTML=renderData(resultValue)
    pager_value.innerHTML = `${(count-1)*x }-${(count-1)*x+x}`
}
let test = EMPLOYEES
renderResult(EMPLOYEES,count);

// Click next
next.onclick=()=>{
    pager_limit.innerHTML = test.length
    // Làm tròn trên để có thể check các page nằm trong các khoảng [a,b]
    if(count < Math.ceil(test.length/x)){
        count++;
        resultValue = [...pagerCount(test,count,x)];
        upValue.innerHTML=renderData(resultValue)
        pager_value.innerHTML = resultValue.length>=count*40?`${(count-1)*x }-${(count-1)*x+x}`:`${(count-1)*x }-${resultValue.length+(count-1)*x}`
        previous.style.opacity = 1;
        // next.style.backgroundColor = '#ffffff';
    }
    else{
        previous.style.opacity = 1;
        next.style.opacity = 0.5;
        count = Math.ceil(test.length/x);
    }
    
}
previous.style.opacity = count===1&& 0.5;
previous.style.opacity = count===Math.ceil(test.length/x)&& 0.5;

//Click previous
previous.onclick=()=>{
    pager_limit.innerHTML = test.length
    if(count>1){
        count--;
        renderResult(test,count);
        previous.style.opacity = 1;
        next.style.opacity = 1;

    } 
    else{
        previous.style.opacity = 0.5;
        count=1;
    }
}

// Search
inputSearch.onkeyup=(e)=>{
    const valueInput = e.target.value.toLocaleLowerCase().trim();
    if(e.keyCode == 13 &&valueInput){
        count=1;
        const resultInput = valueInput&&EMPLOYEES.filter((value)=>{
            const checkBoolean = typeof value.email == "boolean";
            return (value.name.toLocaleLowerCase().includes(valueInput)||
            !checkBoolean&&value.email.toLocaleLowerCase().includes(valueInput)||
            value.job.toLocaleLowerCase().includes(valueInput))
        })
        test =resultInput
        pager_limit.innerHTML = test.length
        console.log(resultInput)
        // resultInput = valueInput?[...resultInput]:[...EMPLOYEES];
        resultValue = [...pagerCount(test,count,x)];
        console.log(resultValue)
        upValue.innerHTML=renderData(resultValue)
        pager_value.innerHTML = resultValue.length>=40?`${(count-1)*x }-${(count-1)*x+x}`:`${(count-1)*x }-${resultValue.length}`
        // e.target.value=''
    }
}

// Value input = 0 => data = EMPLOYEES
inputSearch.oninput=(e)=>{
    if(!e.target.value){
        count=1
        test= EMPLOYEES;
        pager_limit.innerHTML = test.length
        renderResult(test,count);
    }
}

//Sort
sortValue.onchange =(e)=>{
    count=1
    if(e.target.value ==1){
        const testSort = [...test].sort(function (a, b) {
            const aname = a.name.split(' ');
            const bname = b.name.split(' ');
            // End number => take item in [length-2]
            const nameaSort = !Number(aname[aname.length -1]) ? aname[aname.length -1] : aname[aname.length -2]
            const namebSort = !Number(bname[bname.length -1]) ? bname[bname.length -1] : bname[bname.length -2]
            return ('' + nameaSort.localeCompare(namebSort));
        })
        test = testSort
        
    }
    else if(e.target.value==2){
        const testSort = [...test].sort(function (a, b) {
            const aname = a.name.split(' ');
            const bname = b.name.split(' ');
            // End number => take item in [length-2]
            const nameaSort = !Number(aname[aname.length -1]) ? aname[aname.length -1] : aname[aname.length -2]
            const namebSort = !Number(bname[bname.length -1]) ? bname[bname.length -1] : bname[bname.length -2]
            return ('' + namebSort.localeCompare(nameaSort));
        })
        test = testSort
        
    }
    pager_limit.innerHTML = test.length
    renderResult(test,count);

}

// Count pager = max id data
const maxCount = Math.max(...test.map(user => {
    return user.id;
  }));
let counter = maxCount +1 ;
countItem.innerHTML = counter
inputItem.onblur=(e)=>{
    const nameBlurNoVietnamese = e.target.value.toLocaleLowerCase().trim()
    const nameBlur = removeVietnameseTones(e.target.value.toLocaleLowerCase().trim());
    let nameEnd='';
    //Convert email => Standard email
    let emailBlur = nameBlur&&(nameBlur.split(' ').length==1?
                        `${nameBlur.split(' ')[0]}@ntq-solution.com.vn`:
                        `${nameBlur.split(' ')[nameBlur.split(' ').length-1]}.${nameBlur.split(' ')[0]}@ntq-solution.com.vn`)
    nameBlur&&test.forEach((value)=>{
        const checkBoolean = typeof value.email == "boolean";
        let replaceEmail = !checkBoolean&&(value.email.replace(/[0-9]/g,''));
        
        if(value.name.toLocaleLowerCase().includes(nameBlurNoVietnamese)){
            const lengthName = test.filter((valueTest=>{
                return valueTest.name.includes(value.name);
            }))
            nameEnd = `${e.target.value} ${lengthName.length+1}`
        }
        if(!checkBoolean&&replaceEmail.includes(emailBlur)){
            const lengthEmail = test.filter((valueTest=>{
                let checkEmail = valueTest.email.toString().replace(/[0-9]/g,'');
                return checkEmail.includes(emailBlur);
            }))
            emailBlur=emailBlur.replace(/@ntq-solution.com.vn/,`${lengthEmail.length+1}@ntq-solution.com.vn`)
        }
    })
    pager_limit.innerHTML = test.length
    nameEnd = nameEnd?nameEnd:e.target.value    
    console.log('Email:',emailBlur)
    console.log('Name:',nameEnd)
    emailItem.innerHTML = emailBlur
    e.target.value= nameEnd
}

// Submit
addItem.onclick = ()=>{
    if(inputItem.value){
        pager_limit.innerHTML = test.length
        const data = inputItem.value&&jobItem.value&&{
            id : counter,
            name:inputItem.value,
            email:emailItem.innerHTML,
            job:jobItem.value
        }
        EMPLOYEES.unshift(data)
        countItem.innerHTML = counter+1
        counter++
        inputItem.value='';
        inputItem.focus();
        emailItem.innerHTML = ''
        jobItem.value=''
        count=1;
        renderResult(test,count);
    }
    
}

