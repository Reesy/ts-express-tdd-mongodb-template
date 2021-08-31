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
        sh '''#!/bin/bash

npm i'''
        nodejs 'Node 16'
      }
    }

  }
}