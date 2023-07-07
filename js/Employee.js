function Employee (
    id,
    name,
    email,
    password,
    ngaylam,
    luongCB,
    chucvu,
    giolam,

){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.ngaylam = ngaylam;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.giolam = giolam;
}

Employee.prototype.calSalary = function(){
    if(this.chucvu === "Sếp"){
        return this.luongCB *3;
    }
    else if(this.chucvu === "Trưởng phòng"){
        return this.luongCB * 2;
    }
    else if(this.chucvu === "Nhân viên"){
        return this.luongCB *1;
    }
}
Employee.prototype.formatSalary = function() {
    const formattedSalary = this.calSalary().toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND"
    });
    return formattedSalary;
  };

Employee.prototype.calculateRank = function() {
    if (this.giolam >= 192) {
      return 'Nhân viên xuất sắc';
    } else if (this.giolam >= 176) {
      return 'Nhân viên giỏi';
    } else if (this.giolam >= 160) {
      return 'Nhân viên khá';
    } else {
      return 'Nhân viên trung bình';
    }
  };