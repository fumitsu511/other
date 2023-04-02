# alias

alias realias='source ~/.bashrc'



# function

function fileList() {
  rm fileList.txt
  files=`find $1 -type f`
  for file in  $files; do echo $file >> fileList.txt ; done
  }

