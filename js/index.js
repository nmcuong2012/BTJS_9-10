let employees = [];
let isSubmitted = false;

function addEmployees(){
    // let id = document.getElementById("tknv").value;
    // let name = document.getElementById("name").value;
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let ngaylam = document.getElementById("datepicker").value;
    // let luongCB = document.getElementById("luongCB").value;
    // let chucvu = document.getElementById("chucvu").value;
    // let gioLam = document.getElementById("gioLam").value;
    // let employee = new Employee(
    //     id,
    //     name,
    //     email,
    //     password,
    //     ngaylam,
    //     luongCB,
    //     chucvu,
    //     gioLam,
    //   );
    isSubmitted = true;
    let employee = validate();
    if (!employee) {
    return;
  }
    employees.push(employee); 
    display(employees);
    resetForm();
    $('#myModal').modal('hide');

    let successPopup = document.getElementById("successPopup");
    successPopup.style.display = "block";

  // Ẩn popup sau 3 giây
    setTimeout(function() {
    successPopup.style.display = "none";
    }, 3000);
}

///-------------UPDATE NHAN VIEN ------------
function updateEmployee(){
  isSubmitted = true;
  let employee = validate();

  if (!employee) {
    return;
  }
 
  let index = employees.findIndex((value) => {
    return value.id === employee.id;
  });
  employees[index] = employee;
  display(employees);

  // B5: Reset form
  resetForm();
  $('#myModal').modal('hide');
  let successPopup = document.getElementById("successPopup1");
    successPopup.style.display = "block";

  // Ẩn popup sau 3 giây
    setTimeout(function() {
    successPopup.style.display = "none";
    }, 3000);
}
function removeEmployee(employeeID)
{
  employees = employees.filter((value) =>{
    return value.id !== employeeID;
  });
  display(employees);
  let successPopup = document.getElementById("successPopup2");
    successPopup.style.display = "block";

  // Ẩn popup sau 3 giây
    setTimeout(function() {
    successPopup.style.display = "none";
    }, 3000);
}

function findEmployee() {
  // B1: DOM
  let search = document.getElementById("searchRank").value;
  search = search.trim().toLowerCase();

  // B2: Lọc các nhân viên có xếp hạng khớp với giá trị tìm kiếm
  let newEmployees;
  if (search !== "") {
    newEmployees = employees.filter((value) => {
      let rank = value.calculateRank().toLowerCase();
      return rank.includes(search);
    });
  } else {
    newEmployees = employees;
  }

  // B3: Hiển thị các nhân viên được tìm thấy ra giao diện
  display(newEmployees);
}
function selectEmployee(employeeID){
    let employee = employees.find((value) =>{
    return value.id === employeeID;
  });

  document.getElementById("tknv").value = employee.id;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("datepicker").value = employee.ngaylam;
  document.getElementById("luongCB").value = employee.luongCB;
  document.getElementById("chucvu").value = employee.chucvu;
  document.getElementById("gioLam").value = employee.gioLam;


  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}
function resetForm(){
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value ="";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}


function display(employees) {
    let html = employees.reduce((result, value) => {
      return (
        result +
        `
          <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td>${value.ngaylam}</td>
            <td>${value.chucvu}</td>
            <td>${value.formatSalary()}</td>
            <td>${value.calculateRank()}</td>
            <td>
            <button
              class="btn btn-warning" 
              data-toggle="modal"
							data-target="#myModal"
              onclick="selectEmployee('${value.id}')"
            >
              Chỉnh sửa
            </button>
            <button
              class="btn btn-danger"
              onclick="removeEmployee('${value.id}')"
            >
              Xoá
            </button>
          </td>
          </tr>
        `
      );
    }, "");
  
    document.getElementById("tableDanhSach").innerHTML = html;
  }
  function isRequired(value) {
    if (!value.trim()) {
      // Chuỗi rỗng
      return false;
    }
    return true;
  }
  function isSalary(value) {
    if (isNaN(value)) {
      return false;
    }
    if (value < 1000000 || value > 20000000) {
      return false;
    }
    return true;
  }

  function isTime(value){
    if(isNaN(value)){
      return false;
    }
    if (value < 80 || value > 200){
      return false;
    }
    return true;
  }
  function isTknv(value){
    let regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{4,6}$/;
    return regex.test(value);
  }
  function isName(value){
    let regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  }
  function isPassword(value) {
    let regex =
      /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;
  
    return regex.test(value);
  }
  function isEmail(value) {
    let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return regex.test(value);
  }
  function validate() {
    let id = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ngaylam = document.getElementById("datepicker").value;
    let luongCB = document.getElementById("luongCB").value;
    let chucvu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;

    let isValid = true;
    if (!isRequired(id)) {
      // Không hợp lệ
      isValid = false;
      document.getElementById("tbTKNV").innerHTML = "Mã nhân viên không được để trống !";
    }
    else if(!isTknv(id)){
      isValid = false;
      document.getElementById("tbTKNV").innerHTML = "Mã nhân viên từ 4-6 ký tự bao gồm cả chữ cái và số !";
    }
  
    if (!isRequired(name)) {
      isValid = false;
      document.getElementById("tbTen").innerHTML = "Tên không được để trống !";
    }
    else if(!isName(name)){
      isValid = false;
      document.getElementById("tbTen").innerHTML = "Tên chỉ được kí tự là chữ !";
    }
  
    let emailSpan = document.getElementById("tbEmail");
    if (!isRequired(email)) {
      isValid = false;
      emailSpan.innerHTML = "Email không được để trống !";
    } else if (!isEmail(email)) {
      isValid = false;
      emailSpan.innerHTML = "Email không hợp lệ";
    }
  
    let pwSpan = document.getElementById("tbMatKhau");
    if (!isRequired(password)) {
      isValid = false;
      pwSpan.innerHTML = "Mật khẩu không được để trống !";
    } else if (!isPassword(password)) {
      isValid = false;
      pwSpan.innerHTML = "Mật khẩu không hợp lệ";
    }
  
    if (!isRequired(ngaylam)) {
      isValid = false;
      document.getElementById("tbNgay").innerHTML =
        "Ngày làm không được để trống !";
    }
  
    if (!isRequired(luongCB)) {
        isValid = false;
        document.getElementById("tbLuongCB").innerHTML =
        "Lương không được để trống !";
    }
    else if(!isSalary(luongCB))
    {
      isValid = false;
      document.getElementById("tbLuongCB").innerHTML =
        "Lương không hợp lệ vui lòng điền từ 1000000 - 20000000 !";
    }
    if (!isRequired(chucvu)) {
      isValid = false;
      document.getElementById("tbChucVu").innerHTML =
        "Chức vụ không được để trống !";
    }
    if (!isRequired(gioLam)) {
      isValid = false;
      document.getElementById("tbGiolam").innerHTML =
        "Giờ làm không được để trống !";
    }
    else if(!isTime(gioLam)){
      isValid = false;
      document.getElementById("tbGiolam").innerHTML =
      "Giờ làm không hợp lệ vui lòng điền từ 80 - 200 !";
    }
    if (isValid) {
      // Form hợp lệ, tạo ra trả về đối tượng student
      let employee = new Employee(
        id,
        name,
        email,
        password,
        ngaylam,
        luongCB,
        chucvu,
        gioLam,
      );
  
      return employee;
    }
  
    // Form không hợp lệ => Không tạo đối tượng student
    return undefined;
  }


  getElement("#tknv").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbTKNV')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Mã không được để trống !";
    }
  };
  getElement("#name").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbTen')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Tên không được để trống !";
    }
  };
  getElement("#email").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbEmail')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Email không được để trống !";
    }
  };
  getElement("#password").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbMatKhau')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Mật khẩu không được để trống !";
    }
  };
  getElement("#datepicker").onchange = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbNgay')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Ngày làm không được để trống !";
    }
  };
  getElement("#luongCB").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbLuongCB')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Lương không được để trống !";
    }
  };
  getElement("#chucvu").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbChucVu')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Chức vụ không được để trống !";
    }
  };
  getElement("#gioLam").oninput = (event) => {
    if (!isSubmitted) return;
  
    // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
    // event.target: phần tử html phát sinh sự kiện
    // let idSpan = document.getElementById("tbTKNV");
    let idSpan = getElement('#tbGiolam')
    if (isRequired(event.target.value)) {
      idSpan.innerHTML = "";
    } else {
      idSpan.innerHTML = "Giờ làm không được để trống !";
    }
  };

  function getElement(selector) {
    return document.querySelector(selector);
  }