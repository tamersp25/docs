#!groovy

@Library(value='jenkins-scripts@master', changelog=false) _

# This is copied and modified from https://github.com/veritone/jenkins-scripts/blob/master/vars/veritoneStaticPipeline.groovy
# The original includes the conventions for our proper gated release process.
# This copy bypasses all of that and deploys straight to prod.
# In particular, every stage now runs when BRANCH_NAME == 'master' as opposed to things like release/* and prod/* being required for deploys.

pipeline {
    agent { node { label "linux" } }

    options {
        timestamps()
        timeout(time: 90, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(daysToKeepStr: '14'))
    }

    stages
    {
        stage('Setup Environment') {
            steps {
                script {
                    env.AWS_ACCOUNT_ID = awsAccountId()
                    env.GIT_REPO_NAME = "${GIT_URL.reverse().tokenize('/')[0].reverse()[0..-5]}"

                    ARTIFACT_TYPES = getArtifactTypes()
                    AWS_REGIONS = getAwsRegions()
                    DEPLOY_TYPES = ["AWS_S3"]
                    REPOSITORY_TYPES = getRepositoryTypes()
                    DOCKER_BUILD_ARGS = getDockerBuildArgs()
                    DOCKER_TAGS = getDockerTags()
                    APPLICATION_LANGUAGE = getApplicationLanguage()
                    APPLICATION_VERSION = getApplicationVersion()
                    APPROVAL_REQUIRED = isPipelineRequireApproval()
                    DEPLOY_REQUIRED = isDeployTypes(DEPLOY_TYPES)
                    DEPLOY_DEV_ON_FEATURE = isDeployToDevOnFeature()
                    SERVICES_FOR_TERRAFORM = getServicesLinkedToRepo()
                    PULL_REQUEST_URL = getGitPullRequest(GIT_REPO_NAME, GIT_COMMIT)
                }

                nodeInstall(APPLICATION_VERSION, null)

                // yarn install prior to parallel builds
                withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        #!/bin/bash
                        git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
                        export PATH=\$PATH:`npm bin`
                        yarn install
                    """
                }
            }
        }
        stage("Build \'DEV\'") {
            when {
                beforeAgent true
                allOf {
                    anyOf {
                        expression { BRANCH_NAME == 'master' }
                        expression { BRANCH_NAME.trim().toLowerCase().startsWith("dev/") }
                        expression { BRANCH_NAME.trim().toLowerCase().startsWith("feature/") }
                    }
                    expression { DEPLOY_REQUIRED }
                    expression { DEPLOY_DEV_ON_FEATURE }
                }
            }

            environment {
                ENVIRONMENT = "dev"
            }

            steps {
                pullEnvironmentConfigOnBuild(GIT_REPO_NAME, ENVIRONMENT)
                nodeBuild()
                createBuildManifest("./build-${ENVIRONMENT}")
            }
        }
        stage("Deploy \'DEV\'") {
            when {
                beforeAgent true
                allOf {
                    anyOf {
                        expression { BRANCH_NAME == 'master' }
                        expression { BRANCH_NAME.trim().toLowerCase().startsWith("dev/") }
                    }
                    expression { DEPLOY_REQUIRED }
                    expression { DEPLOY_DEV_ON_FEATURE }
                }
            }

            environment {
                ENVIRONMENT = "dev"
            }

            steps {
                terraformDeploy(GIT_REPO_NAME, ENVIRONMENT, AWS_ACCOUNT_ID, DEPLOY_TYPES)
                awsPublishStaticContentToS3("${GIT_REPO_NAME}-${ENVIRONMENT}", ENVIRONMENT)
                //sh "rm -rf ./build config.json config.json.in"

                /* tagger(buildNumber: BUILD_NUMBER,
                environment: ENVIRONMENT,
                branch: GIT_BRANCH)
                */
            }
        }
        stage("Build \'STAGE\'") {
            when {
                beforeAgent true
                allOf {
                    anyOf {
                        expression { BRANCH_NAME == 'master' }
                        expression { BRANCH_NAME.trim().toLowerCase().startsWith("release/") }
                    }
                    expression { DEPLOY_REQUIRED }
                    expression { DEPLOY_DEV_ON_FEATURE }
                }
            }
            parallel {
                stage("Build \'US STAGE\'") {
                    environment {
                        ENVIRONMENT = "stage"
                    }

                    steps {
                        pullEnvironmentConfigOnBuild(GIT_REPO_NAME, ENVIRONMENT)
                        nodeBuild()
                        createBuildManifest("./build-${ENVIRONMENT}")
                    }
                }
            }
        }
        stage("Deploy \'STAGE\'") {
            when {
                beforeAgent true
                allOf {
                    anyOf {
                        expression { BRANCH_NAME == 'master' }
                        expression { BRANCH_NAME.trim().toLowerCase().startsWith("release/") }
                    }
                    expression { DEPLOY_REQUIRED }
                    expression { DEPLOY_DEV_ON_FEATURE }
                }
            }

            parallel {
                stage("Deploy \'US STAGE\'") {
                    environment {
                        ENVIRONMENT = "stage"
                    }

                    steps {
                        terraformDeploy(GIT_REPO_NAME, ENVIRONMENT, AWS_ACCOUNT_ID, DEPLOY_TYPES)
                        awsPublishStaticContentToS3("${GIT_REPO_NAME}-${ENVIRONMENT}", ENVIRONMENT)
                        //sh "rm -rf ./build config.json config.json.in"

                        /* tagger(buildNumber: BUILD_NUMBER,
                        environment: ENVIRONMENT,
                        branch: GIT_BRANCH)
                        */
                    }
                }
            }
        }
        stage("Build \'PROD\'") {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME == 'master' }
                    expression { DEPLOY_REQUIRED }
                }
            }

            parallel {
                stage("Build \'US PROD\'") {
                    when {
                      beforeAgent true
                      expression { VERITONE_DEPLOY_US_PROD == 'TRUE' }
                    }
                    environment {
                        ENVIRONMENT = "prod"
                    }
                    steps {
                        pullEnvironmentConfigOnBuild(GIT_REPO_NAME, ENVIRONMENT)
                        nodeBuild()
                        createBuildManifest("./build-${ENVIRONMENT}")
                    }
                }
                stage("Build \'UK PROD\'") {
                    when {
                      beforeAgent true
                      expression { VERITONE_DEPLOY_UK_PROD == 'TRUE' }
                    }
                    environment {
                        ENVIRONMENT = "uk-prod"
                    }

                    steps {
                        pullEnvironmentConfigOnBuild(GIT_REPO_NAME, ENVIRONMENT)
                        nodeBuild()
                        createBuildManifest("./build-${ENVIRONMENT}")
                    }
                }
            }
        }
        stage("Deploy \'PROD\'") {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME == 'master' }
                    expression { DEPLOY_REQUIRED }
                }
            }

            parallel {
                stage("Deploy \'US PROD\'") {
                    when {
                      beforeAgent true
                      expression { VERITONE_DEPLOY_US_PROD == 'TRUE' }
                    }
                    environment {
                        ENVIRONMENT = "prod"
                    }

                    steps {
                        terraformDeploy(GIT_REPO_NAME, ENVIRONMENT, AWS_ACCOUNT_ID, DEPLOY_TYPES)
                        awsPublishStaticContentToS3("${GIT_REPO_NAME}-${ENVIRONMENT}", ENVIRONMENT)
                        //sh "rm -rf ./build config.json config.json.in"
                    }
                }
                stage("Deploy \'UK PROD\'") {
                    when {
                      beforeAgent true
                      expression {VERITONE_DEPLOY_UK_PROD == 'TRUE' }
                    }
                    environment {
                        ENVIRONMENT = "uk-prod"
                    }

                    steps {
                        terraformDeploy(GIT_REPO_NAME, ENVIRONMENT, AWS_ACCOUNT_ID, DEPLOY_TYPES)
                        awsPublishStaticContentToS3("${GIT_REPO_NAME}-${ENVIRONMENT}", ENVIRONMENT)
                        //sh "rm -rf ./build config.json config.json.in"
                    }
                }
            }
        }
        stage("Notify") {
            when {
                beforeAgent true
                allOf {
                    expression { BRANCH_NAME == 'master' }
                    expression { DEPLOY_REQUIRED }
                }
            }

            environment {
                ENVIRONMENT = "prod"
            }

            steps {
                /* tagger(buildNumber: BUILD_NUMBER,
                environment: ENVIRONMENT,
                branch: GIT_BRANCH)
                */

                script {
                    // https://issues.jenkins-ci.org/browse/JENKINS-49014
                    // https://github.com/jenkinsci/workflow-support-plugin/pull/52
                    // persists build log for this run if it deploys to production
                    currentBuild.rawBuild.keepLog(true)
                }
            }
            post {
                success {
                    slackSend(
                        color: '#00FF00',
                        channel: '#prod_deploy',
                        message: "DEPLOYED: ${GIT_REPO_NAME} [${BRANCH_NAME}] [${BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|job url>) (<${PULL_REQUEST_URL}|pr url>)",
                        tokenCredentialId: 'slack-prod-deploy-channel'
                    )
                }
            }
        }
    }
    post {
        always {
            notifier(currentBuild.result)
        }
    }
}
