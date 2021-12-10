function book(title,author,pages,read){
    this.title=title
    this.pages=pages
    this.read=read
    this.author=author

}
    book.prototype.info=function(){
        let string=(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`);
        return string
    }
let myLibrary=[];

function addBookToLib(book){
    myLibrary.push(book);
}

let displayLib=function(){
    const forms=document.querySelectorAll('form');
    forms.forEach(a=>document.body.removeChild(a));
    const divs=document.querySelectorAll('div');
    divs.forEach(a=>document.body.removeChild(a));
    myLibrary.forEach(book=>{
        let rowobj=document.createElement('div');
        rowobj.setAttribute('data-index',myLibrary.findIndex(a=>a==book));
        rowobj.classList.add('book');
        rowobj.textContent=book.info();
        let toggleread=document.createElement('button');
        toggleread.textContent='Toggle Read';
        toggleread.addEventListener('click',function(e){
            book.read=='read'? book.read='unread':book.read='read';
            console.log(book.info());
            displayLib();
        })
        let removebook=document.createElement('button');
        removebook.textContent='Remove Book';
        removebook.addEventListener('click',function(e){
            e.target.parentNode.remove();
            let z=e.target.parentNode['data-index'];
            myLibrary.pop(z);
        })
        
        rowobj.appendChild(toggleread);
        rowobj.appendChild(removebook);
        document.body.appendChild(rowobj)

})}

let Catch22= new book('Catch 22','Joseph Heller','265','not read')
let Catch23= new book('Catch 22','Joseph Heller','265','not read')
let Catch24= new book('Catch 22','Joseph Heller','265','not read')

addBookToLib(Catch22);
addBookToLib(Catch23);
addBookToLib(Catch24);

let newBookButton=document.createElement('button');
newBookButton.textContent='Add Book';
newBookButton.addEventListener('click',function(e){
openAddBookForm();
})
document.body.appendChild(newBookButton);

displayLib();



function openAddBookForm(){
    const addbookform=document.createElement('form');
    addbookform.classList.add('addform');

    const titleLabel=document.createElement('label');
    titleLabel.textContent='What is the book\'s title?';
    addbookform.appendChild(titleLabel);
    const titleInput=document.createElement('input');
    titleInput.id='title';
    addbookform.appendChild(titleInput);

    const authorInput=document.createElement('input');
    authorInput.id='author';
    const authorLabel=document.createElement('label');
    authorLabel.textContent='What is the author\'s name?';
    addbookform.appendChild(authorLabel);
    addbookform.appendChild(authorInput);

    const pagesInput=document.createElement('input');
    pagesInput.id='pages';
    const pagesLabel=document.createElement('label');
    pagesLabel.textContent='How many pages is it?';
    addbookform.appendChild(pagesLabel);
    addbookform.appendChild(pagesInput);

    const readlabel=document.createElement('label');
    readlabel.textContent='Have you read this before?';
    addbookform.appendChild(readlabel);
    const readCheckBox=document.createElement('input')
    readCheckBox.setAttribute('type','checkbox');
    readCheckBox.id='readcheck';
    addbookform.appendChild(readCheckBox);
    
    const submitBtn=document.createElement('button');
    submitBtn.textContent='Submit';
    submitBtn.addEventListener('click',function(e){
        let titleobj=document.getElementById('title');
        let author=document.getElementById('author');
        let pages=document.getElementById('pages');
        let read=document.getElementById('readcheck');
        if (read.checked==true){
            read='read';
        } else{
            read='unread';
        }
        let newestbook= new book(titleobj.value,author.value,pages.value,read);
        addBookToLib(newestbook);
        displayLib();
    })

    submitBtn.type='button';
    addbookform.appendChild(submitBtn);

    document.body.appendChild(addbookform);
}