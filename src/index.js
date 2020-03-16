var dropRegion = document.getElementById('drop-Area')
dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)
dropRegion.addEventListener('drop', handleDrop, false)

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
    displayFilename(file.name)
  }
}

function displayFilename(name) {
  const li = document.createElement('li')
  const filename = document.createTextNode(name)
  li.appendChild(filename)

  var uploadimage = document.getElementById('listimages').appendChild(li)
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

function renderImageFromFile(file) {
  let reader = new FileReader() // used to read the file from the users remote system

  reader.readAsDataURL(file)

  reader.onload = function() {
    var img = document.createElement('img')

    img.src = reader.result
    img.setAttribute('width', '200px')

    document.getElementById('display').appendChild(img)
  }
}

document
  .querySelector('#upload_button')
  .addEventListener('click', uploadButtonHandler)
