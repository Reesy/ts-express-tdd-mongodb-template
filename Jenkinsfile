pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/Reesy/ts-express-tdd-mongodb-template', branch: 'master')
      }
    }

    stage('Install') {
      steps {
        nodejs('Node 16') {
          sh 'npm i'
        }

      }
    }

    stage('Build') {
      steps {
        nodejs('Node 16') {
          sh 'npm run build'
        }

      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }

  }
}