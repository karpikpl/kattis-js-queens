#!/bin/bash
while getopts p:w: option
do
 case "${option}"
 in
 p) PROBLEM=${OPTARG};;
 w) WORKDIR=${OPTARG};;
 esac
done

if [ -z $PROBLEM ]
  then
    echo Please provide argument -p [problem name]
    exit -1
fi

if [ -z $WORKDIR ]
  then
    echo Please provide argument -w [work directory]
    exit -1
fi

cd $WORKDIR

# clone solution repo
git clone https://github.com/karpikpl/kattis-js-ecma2016.git $PROBLEM
cd $PROBLEM

# remove origin to not commit solution by accident
git remote remove origin

URL='https://open.kattis.com/problems/'$PROBLEM'/file/statement/samples.zip'

echo downloding $URL
mkdir -p datafiles

# download sample data
curl -o ./datafiles/samples.zip $URL
unzip -o ./datafiles/samples.zip -d datafiles
rm ./datafiles/samples.zip

# commit sample data
git add datafiles
git commit -m 'adding data files'

# install dependencies
yarn

atom .
