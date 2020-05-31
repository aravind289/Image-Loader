let imagesToBeDisplayed = []


function preventDefault(e) {
  e.preventDefault()
}


// used for the input file 
function handleDrop(e) {
  var dt = e.dataTransfer //used to get the data that is being dropped
  var files = dt.files //proprty of files is being accessed here
  handleFiles(files)
}


//as multiple file is used ...iterating through the loop and pushing it to global arrayvariable
function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    imagesToBeDisplayed.push(file)

    renderFileNames(imagesToBeDisplayed)
  }
}

//when remove button is clicked before uploading
function removeImageFromlist(name) {
  imagesToBeDisplayed = imagesToBeDisplayed.filter(elem => {
    return (elem.name != name)
  })
  console.log(imagesToBeDisplayed)
  renderFileNames(imagesToBeDisplayed)
}

//when upload button is clicked.calling the function to render  image
function uploadButtonHandler() {
  imagesToBeDisplayed.forEach(imageFile => {
    renderImageFromFile(imageFile)
  })
  clearImageArray()
}


//html functions
var dropRegion = document.getElementById('drop-Area')
dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)
dropRegion.addEventListener('drop', handleDrop, false)


var imagesrcresults = [];

//on refresh retrieving images from local storage
if (localStorage.getItem('imagesUploaded') != null) {
  var readLsImage = localStorage.getItem('imagesUploaded')
  var strToArry = JSON.parse(readLsImage)
  imagesrcresults = strToArry
  displayimage()

}
//file to rendered before upload
function renderFileNames(filesToBeRendered) {
  document.getElementById('listimages').innerHTML = ''
  filesToBeRendered.map(item => {
    displayFilename(item.name)
  })
}

//before upload listing the files choosen
function displayFilename(name) {
  const li = document.createElement('li')
  const removeButton = document.createElement('button')
  removeButton.innerHTML = "Remove"
  const filename = document.createTextNode(name)
  li.appendChild(filename)
  var uploadimage = document.getElementById('listimages').appendChild(li)
  var buttonListener = document.getElementById('listimages').appendChild(removeButton)
  console.log(imagesToBeDisplayed)
  buttonListener.addEventListener('click', (e) => {
    e.preventDefault()
    removeImageFromlist(name)
  })
}

//clearing the state on re-render
function clearImageArray() {
  imagesToBeDisplayed = []
  document.getElementById('listimages').innerHTML = ''
}

//reading the src of the image and pushing the obj created to local variable
function renderImageFromFile(file) {
  let reader = new FileReader() // used to read the file from the users remote system

  reader.readAsDataURL(file)

  reader.onload = function () {
    var nameOfTheFile = file.name

    let obj = {
      name: nameOfTheFile,
      fileSrc: reader.result
    }
    imagesrcresults.push(obj)
    console.log(imagesrcresults)
    displayimage()
    storeInls()
  }
}

//displaying image once upload is pressed
function displayimage() {
  document.getElementById('display').innerHTML = ''
  imagesrcresults.map(srcitem => {

    var img = document.createElement('img')
    img.src = srcitem.fileSrc
    img.setAttribute('width', '200px')
    const removeButton = document.createElement('button')
    removeButton.innerHTML = "Remove"

    document.getElementById('display').appendChild(img)
    document.getElementById('display').appendChild(removeButton)
    removeButton.addEventListener('click', function () {
      imagesrcresults = imagesrcresults.filter(elem => {
        return (elem.name != srcitem.name)
      })
      displayimage()
      storeInls()
    })
  })




}

//storing imgsrc and respective name in ls
function storeInls() {
  var arrayToStr = JSON.stringify(imagesrcresults)
  localStorage.setItem('imagesUploaded', arrayToStr)
}

document
  .querySelector('#upload_button')
  .addEventListener('click', uploadButtonHandler)



function sample() {
  // checing the git push
}