let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

class Account{
    constructor(username, first_name, surname, full_name, email, password){
        this.username = username;
        this.first_name = first_name;
        this.surname = surname;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
    }

}

function register(){
    let username = register_form.username.value;
    let first_name = register_form.first_name.value;
    let surname = register_form.surname.value;
    let full_name = first_name + " " + surname;
    let email = register_form.email.value;
    let password = register_form.password.value;

    if(register_form.first_name.value == '' || register_form.surname.value == '' 
        || register_form.email.value == '' || register_form.username.value == ''
        || register_form.password.value == ''|| register_form.confirm_password.value == ''){
        alert('fyll i alla fälten');
        return;
    }
    if(register_form.confirm_password.value != register_form.password.value ){
        alert('kolla lösenordet igen hörru')
        return;
    }

    let newAccount = new Account(username, first_name, surname, full_name, email, password);

    if(!checkUser(newAccount.username) || !checkEmail(newAccount.email)){
        alert('Användarnamnet eller mailen är redan upptagen')
        return;
    }

    localStorage.setItem("account", JSON.stringify(newAccount));

    alert('Nytt konto skapat. \nAnvändarnamn: ' + username + 
        '\nNamn: ' + full_name +
        '\nMail: ' + email );
    
    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
}


function checkUser(username){
    for(let account of accounts){
        if(account.username == username){
            return false;
        }
    }
    return true;
}
function checkEmail(email){
    for(let account of accounts){
        if(account.email == email){
            return false;
        }
    }
    return true;
}
