const imagemgit = document.getElementById('img-git')

function buscaGit(perfil) {

    let xhr = new XMLHttpRequest

    let url = 'https://api.github.com/users/' + perfil

    xhr.open('GET', url, true)

    xhr.onreadystatechange =  function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let perfilJSON = JSON.parse(xhr.responseText)
            
            imagemgit.setAttribute('class', 'img-git')

            document.getElementById('img-git').src = perfilJSON.avatar_url
            document.getElementById('nome-git').innerText = perfilJSON.name
            document.getElementById('seguidores-git').innerText = "Seguidores: " + perfilJSON.followers
            document.getElementById('seguindo-git').innerText = "Seguindo: " + perfilJSON.following

            buscaRepo(perfil)
        }
    }

    xhr.send()
}

const dadosRepo = document.getElementById('dados-repo')

function buscaRepo(perfil) {

    let xhr = new XMLHttpRequest

    let url = 'https://api.github.com/users/' + perfil + '/repos'

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let reposJSON = JSON.parse(xhr.responseText)
            dadosRepo.innerHTML = ""

            for(i=0; i<reposJSON.length; i++) {
                let divCard = document.createElement('div')
                let divImg = document.createElement('div')
                let divContent = document.createElement('div')
                let htitulo = document.createElement('h3')
                let imgrepo = document.createElement('img')
                let linkRepo = document.createElement('a')
                let cloneRepo = document.createElement('a')

                divContent.setAttribute('class','div-content')
                divCard.setAttribute('class', 'div-card')

                imgrepo.setAttribute('class', 'img-repo')

                htitulo.innerText = reposJSON[i].name
                linkRepo.innerText = 'Link'
                cloneRepo.innerText = 'Clone'

                linkRepo.setAttribute('href', reposJSON[i].html_url)
                cloneRepo.setAttribute('href', '#')
                cloneRepo.setAttribute('onclick', `clone('git clone ${reposJSON[i].html_url}')`)

                divImg.appendChild(imgrepo)
                divContent.appendChild(htitulo)
                divContent.appendChild(linkRepo)
                divContent.appendChild(cloneRepo)

                divCard.appendChild(divImg)
                divCard.appendChild(divContent)

                dadosRepo.appendChild(divCard)

                if(reposJSON[i].language == "HTML") {
                    imgrepo.setAttribute('src', 'img/html.png')
                }

                if(reposJSON[i].language == "CSS") {
                    imgrepo.setAttribute('src', 'img/css.png')
                }

                if(reposJSON[i].language == "JavaScript") {
                    imgrepo.setAttribute('src', 'img/js.png')
                }
                if(reposJSON[i].language == "Handlebars") {
                    imgrepo.setAttribute('src', 'img/handlebar.png')
                }
                if(reposJSON[i].language == "Python") {
                    imgrepo.setAttribute('src', 'img/python.png')
                }
                if(reposJSON[i].language == "TypeScript") {
                    imgrepo.setAttribute('src', 'img/typescript.png')
                }
                if(reposJSON[i].language == null) {
                    imgrepo.setAttribute('src', 'img/github.png')
                }
            }
        }
    }

    xhr.send()
}

function clone(url) {
    const input = document.createElement("input");
    input.value = url;
    input.id = "input";
      document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }