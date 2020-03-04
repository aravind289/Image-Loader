var dropRegion = document.getElementById('drop-Area')
dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)
dropRegion.addEventListener('drop', handleDrop, false)

function preventDefault(e) {
  e.preventDefault()
}

function handleDrop(e) {
  var dt = e.dataTransfer //used to get the data that is being dropped
  var files = dt.files //proprty of files is being accessed here
  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  console.log(files)
  files.forEach(file => {
    let reader = new FileReader() // used to read the file from the users remote system
    reader.readAsDataURL(file)
    console.log(reader)
    reader.onloadend = function() {
      var img = document.createElement('img')

      img.src = reader.result
      img.setAttribute('width', '200px')

      document.getElementById('display').appendChild(img)
    }
  })
}
