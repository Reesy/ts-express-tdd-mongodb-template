pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/Reesy/ts-express-tdd-mongodb-template', branch: 'master')
      }
    }

    stage('Install') {
      parallel {
        stage('Install') {
          steps {
            nodejs('Node 16') {
              sh 'npm i'
            }

          }
        }

        stage('compose up') {
          steps {
            sh 'docker-compose up -d'
          }
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
        nodejs('Node 16') {
          sh '''MONGO_HOST=$HOST_IP
npm run test'''
        }

      }
    }

  }
}