//state functions
let imagesToBeDisplayed = []
let imagesInLs = []

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

    displayFilename(file.name)
  }
}

function removeImageFromlist(name) {
  imagesToBeDisplayed = imagesToBeDisplayed.filter(elem => {
    return (elem.name != name)
  })

}

function uploadButtonHandler() {
  imagesToBeDisplayed.forEach(imageFile => {
    renderImageFromFile(imageFile)

  })
  clearImageArray()
}

function clearImageArray() {
  imagesToBeDisplayed = []
  document.getElementById('listimages').innerHTML = ''
}





//html functions 

var dropRegion = document.getElementById('drop-Area')
dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)
dropRegion.addEventListener('drop', handleDrop, false)




function displayFilename(name) {
  const li = document.createElement('li')
  li.id = name
  const removeButton = document.createElement('button')
  removeButton.innerHTML = "Remove"
  const filename = document.createTextNode(name)
  li.appendChild(filename)
  li.appendChild(removeButton)


  var uploadimage = document.getElementById('listimages').appendChild(li)
  console.log(imagesToBeDisplayed)
  removeButton.addEventListener('click', (e) => {
    e.preventDefault()
    removeImageFromlist(name)
    removeFilenameElement(name)
  })

}
function removeFilenameElement(name) {
  var elementToBeremoved = document.getElementById(name)
  console.log(elementToBeremoved)
  elementToBeremoved.remove()
  console.log(imagesToBeDisplayed)

}



function renderImageFromFile(file) {
  let reader = new FileReader() // used to read the file from the users remote system

  reader.readAsDataURL(file)

  reader.onload = function () {
    var img = document.createElement('img')

    img.src = reader.result
    img.setAttribute('width', '200px')

    document.getElementById('display').appendChild(img)
    console.log(Boolean(document.getElementById('display').innerHTML.length == null))
  }
}

document
  .querySelector('#upload_button')
  .addEventListener('click', uploadButtonHandler)

