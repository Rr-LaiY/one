//新增数据函数
function addRow() {
    var table = document.getElementById("dataTable");
    //console.log(table);
    //获取表格的行数（插入位置）
    var length = table.rows.length;
    //console.log(length);
    //插入一行
    var new_row = table.insertRow(length);
    console.log(new_row);
    //插入单元格并设置内容
    var new_name = new_row.insertCell(0).innerHTML = "新名字";
    var new_age = new_row.insertCell(1).innerHTML = "新年龄";
    var new_action = new_row.insertCell(2).innerHTML = '<button onclick="editRow(this)">编辑</button> <button onclick="deleteRow(this)">删除</button>';
}   
//删除数据函数
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    // table.deleteRow(row.rowIndex);
    row.parentNode.removeChild(row);
}
function editRow(btn) {
    var row = btn.parentNode.parentNode;
    var name = row.cells[0].innerHTML;
    var age = row.cells[1].innerHTML;
    var new_name = prompt("请输入新的名字", name);
    var new_age = prompt("请输入新的年龄", age);
    if (new_name != null && new_name != "") {
        row.cells[0].innerHTML = new_name;
    }
    if (new_age != null && new_age != "") {
        row.cells[1].innerHTML = new_age;
    }
}