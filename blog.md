#### Incremental/Iterative Side Projects that are Fun

__What you will take away from this:__
- How to have fun coding
- How to focus on small chunks of funtionality
- How to pick the right architechture for the job (limit scope)

__My goals for this project:__
- Learn how to manipulate SVGs
- Learn how to test front end components in React
- Sharpen HTML/CSS skills (no ui library components - grid OK)
- Responsive
- Make something beautiful

__How I am going to limit scope:__
- I don't need auth
- I don't need an api
- I don't need redux

#### Phase One:

Snap SVG, Vanilla Javascript, HTML CSS

main.js
index.html
main.css

set of functions that create and populate the DOM with SVG grid and shadow

#### Phase Two:

Add React with Components (no router, no redux)
Make responsive 
Explore testing components ~~ !!

1. make a canvas component that will display svg √
1. move inupts underneath canvas at 500px width √
1. set a min height and turn on scrolling when met

#### Phase Three:

Allow user input √
Animate Grid changes

1. user input √
2. lock down inputs to only allow valid entries (radius can't be negative)
3. create a draw button that draws the circle grid

#### Phase Four: 

1. create a drop down of different color schemes
1. make a random button that fills in all fields randomly
1. separate out values for rows and columns
1. ????

#### Beyond: 

1. handle new shapes - squares, triangles, ellipses
1. change perspective of shadow 


### setting up a EC2 with nginx and ssl to host my react app

EC2 setup

https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04

install git:

```
sudo apt-get install git
```

set up a new ssh key

https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

on the ssh-add step do this instead

```
cp /root/.ssh/id_rsa ~/.ssh/id_rsa
cd ~/.ssh
ssh-add
cd ~
```
```
sudo cat ~/.ssh/id_rsa
```

copy the output and add it to github as a new ssh key

ready to sudo git clone etc...

dockerize react app --> https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378

push to docker hub

```
docker login
docker tag <image-name> topleft/<image-name>
docker push topleft/<image-name>
```

install docker

```
sudo apt install docker.io
```

nginx and Letsencrypt with certbot

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

instead of using /etc/nginx/sites-available/default I made one specific for the url --> circle-grid.petej.org.conf  file, leaving the defulat file completely alone

I also need to sym link this file: 
```
sudo ln -s /etc/nginx/sites-available/circle-grid.petej.org.conf /etc/nginx/sites-enabled/
```

