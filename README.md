# fruit-box game

### Dev
```
yarn

yarn dev
```


### Deploy
```
docker build --platform amd64 -t apple-game-image . 

docker tag apple-game-image asia-northeast3-docker.pkg.dev/applegame/apple-game-front/apple-game-image

docker push asia-northeast3-docker.pkg.dev/applegame/apple-game-front/apple-game-image 
```
