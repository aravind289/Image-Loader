let imagesToBeDisplayed = []


function preventDefault(e) {
  e.preventDefault()
}

function handleDrop(e) {
  var dt = e.dataTransfer //used to get the data that is being dropped
  var files = dt.files //proprty of files is being accessed here
  handleFiles(files)
}

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    imagesToBeDisplayed.push(file)

    renderFileNames(imagesToBeDisplayed)
  }
}
function removeImageFromlist(name) {
  imagesToBeDisplayed = imagesToBeDisplayed.filter(elem => {
    return (elem.name != name)
  })
  console.log(imagesToBeDisplayed)
  renderFileNames(imagesToBeDisplayed)
}

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


if (localStorage.getItem('imagesUploaded') != null) {
  var readLsImage = localStorage.getItem('imagesUploaded')
  var strToArry = JSON.parse(readLsImage)
  imagesrcresults = strToArry
  displayimage()

}

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

function renderFileNames(filesToBeRendered) {
  document.getElementById('listimages').innerHTML = ''
  filesToBeRendered.map(item => {

    displayFilename(item.name)

  })

}

function clearImageArray() {
  imagesToBeDisplayed = []
  document.getElementById('listimages').innerHTML = ''
}

function renderImageFromFile(file) {
  let reader = new FileReader() // used to read the file from the users remote system

  reader.readAsDataURL(file)

  reader.onload = function () {
    imagesrcresults.push(reader.result)
    displayimage()
  }
}


function displayimage() {
  document.getElementById('display').innerHTML = ''
  imagesrcresults.map(srcitem => {

    var img = document.createElement('img')
    img.src = srcitem
    img.setAttribute('width', '200px')

    document.getElementById('display').appendChild(img)
    console.log(Boolean(document.getElementById('display').innerHTML.length == null))
    storeInls()

  })


}


function storeInls() {
  var arrayToStr = JSON.stringify(imagesrcresults)
  localStorage.setItem('imagesUploaded', arrayToStr)
}

document
  .querySelector('#upload_button')
  .addEventListener('click', uploadButtonHandler)


