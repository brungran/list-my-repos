This is a simple app to list a user's repositories and it's commits.

## Running the Dev Version
Clone this repository and edit the *.env* file accordingly.

### Running WITH Docker
Start a temporary container:
```sh
docker run --rm --volume "$PWD:/usr/src/app" --workdir "/usr/src/app" --publish 80:5173 -it node:lts bash
```
Install the project's dependencies:
```sh
npm install
```
You can choose to exit the container pressing *ctrl+c* or to run the project with the temporary container.

#### If You Chose to Run the Project With the Temporary Container
Run:
```sh
npm run dev
```
You should be able to use the app by accessing *localhost* in your browser.

#### If You Didn't Choose to Run the Project With the Temporary Container
Press *ctrl+c*.
Run:
```sh
docker compose up
```
You should be able to use the app by accessing *localhost* in your browser.

### Running WITHOUT Docker
Install the dependencies with:
```sh
npm install
```
Run the project with:
```sh
npm run dev
```
You should be able to use the app by accessing *localhost:5173* in your browser.

