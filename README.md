### Installation
 - Must have Node and NPM installed on machine.
 - Download and unzip flight-search-app.
 - Intall node dependencies using
    ```sh
    $ npm install
    ```
- Generate fake web api data and run fake json server
     ```sh
    $ npm run generate
    $ npm run server
    ```
- Start the app using
    ```sh
    $ npm run start
    ```
- Once, app is started. Browse using below url
    ```sh
    http://localhost:4200/
    ```
- Unit Test the app using
    ```sh
    $ npm run test
    ```

### Tech Stack
- **[Angular8]** - To enhance web app.
- **[TypeScript]** - Type safety and easy development.
- **[Angular Material UI Component Library]** - For creative and quick UI designs.
- **[Jasmine, karma and TestBed Unit Testing]** - To ensure integrity of app through unit tests.
- **[Rsjs Behaviorsubject pattern and Operators]** - To implement pub/sub pattern and easily data manipulation.
- **[Ngx- Translate]** - To support multi-language and culture.
- **[NodeJS]** - To create fake flight web api.
- **[Faker]** - To create fake data.
- **[Json Server]** - To host fake web api.
- **[HttpInterceptor]** - To implement global http error handling and retry logic.
- **[Lodash]** - For easier and readable JS operations.
- **[HttpClient]** - For http calls and observables.

### How to use App
- Once you started the app, you will be routed to landing page where you can see few fields and search button. Below is the snapshot of app.
![landing Page](https://user-images.githubusercontent.com/17959609/69681999-15b5d180-1104-11ea-96c7-8ea4f29634f2.png)

- App has already pre-filled data/ default data so you can simply click search icon to get the flights matching the creteria. Once flights data is fetched a success toast is also displayed.
- You can easily filter the flights data by entering the filter text. For Instance, if I want to see only China airlines.
![Filter](https://user-images.githubusercontent.com/17959609/69682212-c8862f80-1104-11ea-93c4-a1772f3e53f8.png)
- App will prompt validation error messages if field has invalid data.
![validation-Error](https://user-images.githubusercontent.com/17959609/69682351-41858700-1105-11ea-9a87-12bd69e4fe90.png)
- App supports multi language and culture which can be selected from drop down in header
![language-Change](https://user-images.githubusercontent.com/17959609/69682535-d0929f00-1105-11ea-81a4-02a5cf46cdb7.png)
- For Instance, you selected 'German' language then you will notice that all labels change to german language.
![German-Language](https://user-images.githubusercontent.com/17959609/69682644-31ba7280-1106-11ea-86f0-0298ef45e5bc.png)
- Code has Unit Test Coverage of **93.94%**
![Unit-Test](https://user-images.githubusercontent.com/17959609/69682923-24ea4e80-1107-11ea-9737-73ca9c49412f.png)

### Architecture
- Components - App is divided into 3 main components -
     1. [App component] - parent container.
     2. [Flight-Search Component] - contains all the fields and search button.
     3. [Flight-List Component] - shows flight data in grid with filter.
- Services - To facilitate loose coupling and reuseability.
    1. [Flight-Service] - Its a rxjs behaviourSubject for flight data.
    2. [Web-Api] - To make HTTP Calls.
    3. [Icon-Service] - To register icon for app.
- Validators - To apply validations for forms and controls.
    1. [Date-Validator] - for date validations (departure and return date).
    2. [max-Character-Validator] - for max 3 alphanumeric characters validation (departure airport code and arrival airport code).

### Thanks, Enjoy Flight Search App.
