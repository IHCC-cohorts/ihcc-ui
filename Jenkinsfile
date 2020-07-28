def dockerHubRepo = "icgcargo/platform-ui"
def commit = "UNKNOWN"
def version = "UNKNOWN"

pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        script {
          commit = sh(returnStdout: true, script: 'git describe --always').trim()
        }
        script {
          version = sh(returnStdout: true, script: 'cat ./package.json | grep version | cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\'').trim()
        }
      }
    }
    stage('Build container') {
      steps {
        sh "docker build -f Dockerfile . -t ${dockerHubRepo}:${commit}"
      }
    }
    stage('Pushes edge image') {
      when {
        branch "develop"
      }
      steps {
        withCredentials([usernamePassword(credentialsId:'ihccDockerhubUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
          sh "docker tag ${dockerHubRepo}:${commit} ${dockerHubRepo}:edge"
          sh "docker push ${dockerHubRepo}:${commit}"
          sh "docker push ${dockerHubRepo}:edge"
        }
      }
    }
    stage('Pushes edge image') {
      when {
        branch "develop"
      }
      steps {
        withCredentials([usernamePassword(credentialsId:'ihccDockerhubUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'docker login -u $USERNAME -p $PASSWORD'
          sh "docker tag ${dockerHubRepo}:${commit} ${dockerHubRepo}:latest"
          sh "docker tag ${dockerHubRepo}:${commit} ${dockerHubRepo}:${version}"
          sh "docker push ${dockerHubRepo}:latest"
          sh "docker push ${dockerHubRepo}:${version}"
        }
      }
    }
  }
}
