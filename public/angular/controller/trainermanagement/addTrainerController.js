var app=angular.module("app");
var answerarr=[];
var answercer=[];
var answerarrv=[];
var answerarrt=[];

var relanswerarr=[];
var relanswercer=[];
var relanswerarrt=[];
var relanswerarrv=[];
var cot=0;
var editableJSon={};

var prereqFlag=true;
var relFlag=false;
var finJSon;
var activestatus;
var cert_duplicate=false;
var certification_array=[];
var competencyarray=[];
var Competency={};


app.controller("addTrainerCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,trainerService)
{


//************************* edit functions starts******************//

//check for editable mode
console.log("locationnn pathh::" )
if( $location.path() == "/edittrainerinternal")
{
  console.log("inside edit trainer internal")
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}

else if($location.path()=="/edittrainerexternal")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
else if($location.path()=="/edittrainerfreelance")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
//allow edit action while it is in editablemode
console.log("LocalStorage::"+$localStorage.editonlypass);
console.log("location path::"+$location.path());
  if($localStorage.editonlypass==$location.path())
  {
    console.log("External localStorage");
        $location.path($localStorage.editonlypass);
   } 
   else if($location.path()=="/addtrainerinternal")
   {
        $localStorage.editonlypass="";
        console.log("Trainer TYPE CHECK::"+trainertype);
        if (trainertype) {
             console.log("Trainer TYPE::"+trainertype)
        }
   }
  else if($location.path()=="/addtrainerexternal")
  {
       $localStorage.editonlypass="";
        console.log("Trainer TYPE CHECK::"+trainertype);
        if (trainertype) {
             console.log("Trainer TYPE::"+trainertype)
        }

  }
  else if($location.path()=="/addtrainerfreelance")
  {
       $localStorage.editonlypass="";
        console.log("Trainer TYPE CHECK::"+trainertype);
        if (trainertype) {
             console.log("Trainer TYPE::"+trainertype)
        }

  }
   else if($location.path() == "/managetrainer")
  {
     
     $localStorage.editonlypass="";
      cot=1;

  }
  else
  {
     $location.path("/managetrainer");
  }

  //Active status
  $scope.changeActiveStatus=function()
  {
    $scope.carrymodel.activestatus=!$scope.carrymodel.activestatus;
    $scope.getTrainermgmt();
  }

$scope.editTrainer=function(item)
  { 
     console.log("edit trainer"+JSON.stringify(item));
     editableJSon=item;

     console.log("ediitpass"+ $localStorage.editonlypass)
     console.log("local PAth"+$location.path());
     
   if(editableJSon.trainertype=="Internal")
     { 
      $localStorage.type="Internal";
      console.log("edit internal trainer"+JSON.stringify(editableJSon));
      $scope.carrymodel=editableJSon;
      $localStorage.editonlypass="/edittrainerinternal";
       $location.path("/edittrainerinternal");
       }
        else if(editableJSon.trainertype=="External")
     {  
     $localStorage.type="External";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit External trainertype::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edittrainerexternal";
      $localStorage.currentPath="/edittrainerexternal"
      $location.path("/edittrainerexternal");   
      }
   }
//*****************************end edit function****************************************//


//**********************change fuction***********************//
 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
$scope.selectJson=[];
$scope.selectJsoncomp=[];
$scope.selectJsoncert=[];
$scope.selectJsonven=[];

var trainertype=[];
$scope.types=['Internal','External','Freelance'];
$scope.changeType=function()
{

$localStorage.trainertype=$scope.carrymodel.trainertype;
$scope.trainertype=$scope.carrymodel.trainertype;
console.log("local trainertype::"+$localStorage.trainertype)
trainertype=$scope.carrymodel.trainertype;
console.log("trainerType::"+JSON.stringify(trainertype));
}
//*******************************end change function*************************************//
$scope.activeTrainer=function(item){
var activeItem=item;
console.log("Active/Inactive::"+JSON.stringify(activeItem));
trainerService.activeTrainer(activeItem).then(function(response) {
$scope.getTrainer();
}); 
}

//*****************************pick employee  starts****************//
// dialog to pick employee
$scope.showAdvanced = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog1.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen

})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarr.push(answer[i]);
}
$scope.carrymodel.selectemployee=answerarr;

console.log("Answer::"+JSON.stringify($scope.carrymodel.selectemployee));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOne=function(vindex){
console.log(JSON.stringify($scope.getInternalTrainer));
}
$scope.checkAll = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalTrainer, function (item) {
if (prereqFlag==true) {

if (answerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(answerarr));
for (var i =0; i <answerarr.length; i++) {
if (item.firstname==answerarr[i].firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
else if (relFlag==true) {
if (relanswerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(relanswerarr));
for (var i =0; i <relanswerarr.length; i++) {
if (item.firstname==relanswerarr[i].firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionemployee=function(){
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getInternalTrainer.length;i++){
        if ($scope.getInternalTrainer[i].Selected==false || !angular.isDefined($scope.getInternalTrainer[i].Selected)) {
        }else{
        $scope.selectJson.push($scope.getInternalTrainer[i]);
        console.log("ddd"+JSON.stringify($scope.selectJson))
        };
        
      }
      $mdDialog.hide($scope.selectJson);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getInternalTrainer.length;i++){
          if ($scope.getInternalTrainer[i].relSelected==false || !angular.isDefined($scope.getInternalTrainer[i].relSelected)) {
          }else{
          $scope.selectJson.push($scope.getInternalTrainer[i]);
        };
    }
    $mdDialog.hide($scope.selectJson);
    }
}




//Get trainer 
$scope.getTrainer=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getTrainer(activestatus).then(function(response) {

$scope.getInternalTrainer=response.data;


$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].firstname==$scope.getInternalTrainer[i].firstname) {
$scope.getInternalTrainer[i].Checked=true;

}
};
}
}
}else if (relFlag==true) {
if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].firstname==$scope.getInternalTrainer[i].firstname) {
$scope.getInternalTrainer[i].relChecked=true;
}
};
}
}
}
});
}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getTrainer();

$scope.removeTrainer=function(vindex){
      $scope.carrymodel.selectemployee.splice(vindex,1);
    }

//***************************pick employee ends************************//

//*************************** competency starts************************//
// dialog to pick competency

$scope.showAdvancedCompetency = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog2.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen

})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answercer.push(answer[i]);
}
$scope.carrymodel.selectcompetency=answercer;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectcompetency));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.Competency_checkOne=function(vindex){
console.log(JSON.stringify($scope.getInternalCompetency));
}
$scope.checkAllComp = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalCompetency, function (item) {
if (prereqFlag==true) {

if (answercer.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answercer TEM::"+JSON.stringify(answercer));
for (var i =0; i <answercer.length; i++) {
if (item.skills==answercer[i].skills) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswercer.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answercer TEM::"+JSON.stringify(relanswercer));
for (var i =0; i <relanswercer.length; i++) {
if (item.skills==relanswercer[i].skills) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}

$scope.saveActionCompetency=function(){
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getInternalCompetency.length;i++){
        if ($scope.getInternalCompetency[i].Selected==false || !angular.isDefined($scope.getInternalCompetency[i].Selected)) {
        }else{
        $scope.selectJsoncomp.push($scope.getInternalCompetency[i]);
        console.log("ddd"+JSON.stringify($scope.selectJsoncomp))
        };
        
      }
      $mdDialog.hide($scope.selectJsoncomp);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getInternalCompetency.length;i++){
          if ($scope.getInternalCompetency[i].relSelected==false || !angular.isDefined($scope.getInternalCompetency[i].relSelected)) {
          }else{
          $scope.selectJsoncomp.push($scope.getInternalCompetency[i]);
        };
    }
    $mdDialog.hide($scope.selectJsoncomp);
    }
}




//Get Course 
$scope.getCompetency=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getCompetency(activestatus).then(function(response) {

$scope.getInternalCompetency=response.data;
competencyResponse=response.data;

$scope.getCompetencydata(response.data);
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answercer.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answercer[j].skills==$scope.getInternalCompetency[i].skills) {
$scope.getInternalCompetency[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answercer.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answercer[j].skills==$scope.getInternalCompetency[i].skills) {
$scope.getInternalCompetency[i].relChecked=true;
}
};
}
}
}
});
}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getCompetency();

$scope.removeCompetency=function(vindex){
      $scope.carrymodel.selectcompetency.splice(vindex,1);
    }
//**************** competency ends ***********************//

//**************** certification starts *****************************//

$scope.showAdvancedCertification = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog3.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarrt.push(answer[i]);
}
$scope.carrymodel.selectcertification=answerarrt;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectcertification));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOneCertf=function(vindex){
console.log(JSON.stringify($scope.getInternalCertification));
}
$scope.checkAllCertf = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalCertification, function (items) {
if (prereqFlag==true) {

if (answerarrt.length==0) {
items.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(items));
console.log("answerarrt TEM::"+JSON.stringify(answerarrt));
for (var i =0; i <answerarrt.length; i++) {
if (items.Certification==answerarrt[i].Certification) {
items.Selected=false;
return;
}else{
items.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarrt.length==0) {
items.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(items));
console.log("answerarrt TEM::"+JSON.stringify(relanswerarrt));
for (var i =0; i <relanswerarrt.length; i++) {
if (items.Certification==relanswerarrt[i].Certification) {
items.Selected=false;
return;
}else{
items.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionCertification=function(){
console.log(JSON.stringify($scope.getInternalCertification));
for(var i=0;i<$scope.getInternalCertification.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalCertification[i].Selected));
if ($scope.getInternalCertification[i].Selected==false || !angular.isDefined($scope.getInternalCertification[i].Selected)) {}else{
$scope.selectJsoncert.push($scope.getInternalCertification[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJsoncert));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJsoncert);

}
//Get Course 
$scope.getCertification=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getCertification(activestatus).then(function(response) {

$scope.getInternalCertification=response.data;
$scope.getTrainerCertification(response.data);
CertificateResponse=response.data;


$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrt.length; j++) {
for (var i = 0; i < $scope.getInternalCertification.length; i++) {
if (answerarrt[j].Certification==$scope.getInternalCertification[i].Certification) {
$scope.getInternalCertification[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrt.length; j++) {
for (var i = 0; i < $scope.getInternalCertification.length; i++) {
if (answerarrt[j].Certification==$scope.getInternalCertification[i].Certification) {
$scope.getInternalCertification[i].relChecked=true;
}
};
}
}
}
});
}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getCertification();

$scope.removeCertification=function(vindex){
      $scope.carrymodel.selectcertification.splice(vindex,1);
    }

//****************************competency ends*******************//



//***************************** vendor starts *****************//

$scope.showAdvancedVendor = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/External/dialog4.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarrv.push(answer[i]);
}
$scope.carrymodel.selectvendor=answerarrv;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectvendor));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOneVendor=function(vindex){
console.log(JSON.stringify($scope.getInternalVendor));
}
$scope.checkAllVendor = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalVendor, function (item) {
if (prereqFlag==true) {

if (answerarrv.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrt TEM::"+JSON.stringify(answerarrv));
for (var i =0; i <answerarrv.length; i++) {
if (item.Firstname==answerarrv[i].Firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarrv.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrt TEM::"+JSON.stringify(relanswerarrv));
for (var i =0; i <relanswerarrv.length; i++) {
if (item.Firstname==relanswerarrv[i].Firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionVendor=function(){
console.log(JSON.stringify($scope.getInternalVendor));
for(var i=0;i<$scope.getInternalVendor.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalVendor[i].Selected));
if ($scope.getInternalVendor[i].Selected==false || !angular.isDefined($scope.getInternalVendor[i].Selected)) {}else{
$scope.selectJsonven.push($scope.getInternalVendor[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJsonven));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJsonven);

}
//Get Vendor
$scope.getVendor=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getVendor(activestatus).then(function(response) {

$scope.getInternalVendor=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrv.length; j++) {
for (var i = 0; i < $scope.getInternalVendor.length; i++) {
if (answerarrv[j].Firstname==$scope.getInternalVendor[i].Firstname) {
$scope.getInternalVendor[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrv.length; j++) {
for (var i = 0; i < $scope.getInternalVendor.length; i++) {
if (answerarrv[j].Firstname==$scope.getInternalVendor[i].Firstname) {
$scope.getInternalVendor[i].relChecked=true;
}
};
}
}
}
});
}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getVendor();

$scope.removeVendor=function(vindex){
      $scope.carrymodel.selectvendor.splice(vindex,1);
    }


//*********************  Trainer Management ***********************//

  $scope.getTrainermgmt=function()
   {
      console.log("get TrainerManagement");
     if (!angular.isDefined(activestatus) || !$scope.activestatus)
      {
        console.log("undefined");
        activestatus=false;
      }
      else
      {
       activestatus=$scope.activestatus;
      }
       console.log("activestatus"+activestatus);
       trainerService.getTrainermgnt(activestatus).then(function(response) 
       {  
          $scope.isLoading=true;
       
         $scope.getTrainerList=response.data;
         $scope.getTrainerType(response.data);
         trainerResponse=response.data;
         
         console.log("Get Trainer List::"+JSON.stringify($scope.getTrainerList));
         $scope.isLoading=false;
       });
   }

    $scope.activeTrainer=function(item)
  {
    var activeItem=item;
    trainerService.activeTrainer(activeItem).then(function(response) {
    $scope.getTrainermgmt();
    }); 
  }


//********************************* submit  action ********************//
   $scope.submitaction=function(savedata)
   {
    
    console.log("submitaction"+JSON.stringify(savedata));
    console.log("location path"+$location.path());
    if($location.path()=="/addtrainerinternal")
    {
      $scope.carrymodel.trainertype="Internal"
  console.log("ci"+JSON.stringify(savedata));
         trainerService.addTrainer(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/managetrainer");
            };
        })
    }
    
    else if ($location.path()=="/addtrainerexternal") 
    {
          $scope.carrymodel.trainertype="External"
      console.log("ci"+JSON.stringify(savedata));
           trainerService.addTrainer(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/managetrainer");
            };
        })
    }
    else if ($location.path()=="/addtrainerfreelance") 
    {
          $scope.carrymodel.trainertype="Freelance"
      console.log("ci"+JSON.stringify(savedata));
           trainerService.addTrainer(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/managetrainer");
            };
        })
   }
   else if($location.path()=="/edittrainerinternal")
    {                                        
      console.log("edit trainer::"+JSON.stringify($scope.carrymodel));
      trainerService.updatetrainerdatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/managetrainer");
           };
       })
     }
     else if($location.path()=="/edittrainerexternal")
    {                                        
      console.log("edit trainer::"+JSON.stringify($scope.carrymodel));
      trainerService.updatetrainerdatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/managetrainer");
           };
       })
     } 
        else if($location.path()=="/edittrainerfreelance")
    {                                        
      console.log("edit trainer::"+JSON.stringify($scope.carrymodel));
      trainerService.updatetrainerdatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/managetrainer");
           };
       })
     } 
    
   }
   $scope.getTrainerType=function(getResponse)
    {
      $scope.trainerTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.trainerTypeList.indexOf(getResponse[i].trainertype) == -1)
        {
          $scope.trainerTypeList.push(getResponse[i].trainertype);
        }
      }
      console.log("trainer type List::"+$scope.trainerTypeList);
      self.trainertypedatas=$scope.trainerTypeList;
    }

  // remove vendor
  $scope.removeTrainermgnt=function(id)
  {
    console.log("Remove trainer Management"+id);
    trainerService.removeTrainermgnt(id).then(function(response)
    {
      console.log("removeTrainermgnt"+JSON.stringify(response.data))

      
      
    });
    $scope.getTrainermgmt();
  }


// ***********************get trainermgmt ends************************//
// *********************** duplicate check ***************************//
  $scope.Ontraineremailcheck=function(data)
    { 
if(data==undefined)
       {
         $scope.Trainer_emailStatus="";
       }
       else
       {
       var email={};
       email.Trainer_email=data;
       console.log("Trainer_email"+JSON.stringify(email));
       trainerService.Ontraineremailcheck(email).then(function(response)
       {
      console.log(JSON.stringify(response.data));
       if(response.data=="Exists")
       {
          $scope.Trainer_emailStatus="Email ID Already Exists";
          $scope.Trainer_emailStatusStyle="text-danger";
       }
       else
       {
          $scope.Trainer_emailStatus="Available";
          $scope.Trainer_emailStatusStyle="text-success";
       }

       });

     }
    }
//*********************** dupliacate check end ***********************//

var self = this;
this.dis_skills=true;
this.dis_subcompetency=true;

    // self.querySearchuser=querySearchuser;
    // self.searchuserChange=searchuserChange;
    // self.selecteduserChange=selecteduserChange;

   self.querySearchType=querySearchType;
    self.searchTypeChange=searchTypeChange;
    self.selectedTypeChange=selectedTypeChange;


function querySearchType (query) 
 {
      console.log("sr::"+query); 
      var results = query ? self.trainertypedatas.filter( createFilterFor(query) ) : self.trainertypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
function searchTypeChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
  function selectedTypeChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        $scope.getTrainerList=trainerResponse;
        // this.dis_Country=true;
       
      }
      else{
        // this.dis_Country=false;
        
      self.selectedType=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedType))
      $scope.getTrainerList = ($filter('filter')($scope.getTrainerList, {trainertype: self.selectedType}));
      $scope.trainertypedatas=$scope.getTrainerList;
      // alert(JSON.stringify($scope.vendortypedatas));
       console.log("Trainer Data"+JSON.stringify($scope.trainertypedatas))
       // $scope.getCountryList(item,vendorResponse);
     }
    }

    
 function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          res=angular.lowercase(res);
          // alert(JSON.stringify(res));
          console.log("sj::"+lowercaseQuery);
          //   return (res.indexOf(lowercaseQuery) == 0);
          return (res.search(lowercaseQuery) !== -1);
        };

    }




 
// Employee filter
// Competency
 this.dis_skills=true;
 this.dis_subcompetency=true;

    self.querySearchCompetency   = querySearchCompetency;
    self.selectedCompetencyChange = selectedCompetencyChange;
    self.searchCompetencyChange   = searchCompetencyChange;
    // Sub Competency
    self.querySearchSubCompetency   = querySearchSubCompetency;
    self.selectedSubCompetencyChange = selectedSubCompetencyChange;
    self.searchSubCompetencyChange   = searchSubCompetencyChange;
     // Skills
    self.querySearchSkills   = querySearchSkills;
    self.selectedSkillsChange = selectedSkillsChange;
    self.searchSkillsChange   = searchSkillsChange;

   $scope.getCompetencydata=function(getResponse)
   {
      $scope.CompetencyList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.CompetencyList.indexOf(getResponse[i].competency) == -1) 
        {
          // console.log("CompetencyList"+JSON.stringify($scope.CompetencyList.push(getResponse[i].competency)))
         $scope.CompetencyList.push(getResponse[i].competency);
        }
     }
       console.log("Competency List::"+$scope.CompetencyList);
      self.competencydata=$scope.CompetencyList;
   }

   function querySearchCompetency (query) 
 {     
  

  console.log("datas::"+JSON.stringify(self.competencydata));
      console.log("sr::"+query); 
      var results = query ? self.competencydata.filter( createFilterFor(query) ) : self.competencydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCompetencyChange(text)
    {    $scope.Competency=competencyResponse;
              $log.info('Text changed to ' + text);
              // this.searchSubCompetency="";
      
    }
  function selectedCompetencyChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {    
          $scope.Competency=competencyResponse;
         // self.subcompetency="";
         
         self.searchSubCompetency="";
         self.searchSkills="";
         this.dis_subcompetency=true;
         this.dis_skills=true;
    }
      else{
        this.dis_subcompetency=false;
      self.selectedCompetency=item;
       $scope.Competency=($filter('filter')($scope.Competency, {competency: item}));
       $scope.Competencyfliter=$scope.Competency;
       console.log(JSON.stringify($scope.Competency))
       $scope.getSubCompetencydata(item,competencyResponse);
       console.log();
       $scope.example=item;
       
       ;
       
     }
    }


    $scope.getSubCompetencydata=function(selectedCompetency,getResponse)
    {    $scope.Competency=$scope.Competencyfliter;
      console.log("selectedCompetency::"+JSON.stringify(selectedCompetency))
    console.log("competencyResponse"+JSON.stringify(getResponse))
      // console.log("subcompetency competency get::"+selectedCompetency);
      /*bhuvanesh*/
      
      $scope.SubCompetencyList=[];
      for (var i = 0;i<getResponse.length;i++) {
        // console.log(selectedCompetency+"="+getResponse[i].competency);
        if (selectedCompetency==getResponse[i].competency) {
          if ($scope.SubCompetencyList.indexOf(getResponse[i].sub_competency) == -1) {
            $scope.SubCompetencyList.push(getResponse[i].sub_competency);
            }
        };
        
      };
      self.subcompetency=$scope.SubCompetencyList;
      
      console.log("SubCompetency List::"+self.subcompetency);
  }
   
   function querySearchSubCompetency (query) {
    console.log("SubCompetency::"+query); 
      var results = query ? self.subcompetency.filter( createFilterFor(query) ) : self.subcompetency,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSubCompetencyChange(text) {
      $log.info('Text changed to ' + text);
      
    }
    function selectedSubCompetencyChange(item) {
    if(item == undefined)
    {  
      $scope.Competency=$scope.Competencyfliter;
       this.searchSkills=""; 
       this.dis_skills=true;    
    } 
   else{       this.dis_skills=false;
       self.selectedSubCompetency=item;
      console.log("Sub competencyResponse"+JSON.stringify(self.selectedSubCompetency))
      $scope.Competency= ($filter('filter')($scope.Competencyfliter,{sub_competency:self.selectedSubCompetency})); 
        $scope.SubCompetencyfilter=$scope.Competency;
      $scope.getSkills(self.selectedSubCompetency,competencyResponse);
      $scope.example=item;
     }
    }
    $scope.getSkills=function(selectedSubCompetency,getResponse)
    { $scope.Competency=$scope.SubCompetencyfilter;
        $log.info('slected subcompetency ' + JSON.stringify(selectedSubCompetency));
        console.log("Response data"+JSON.stringify(getResponse))
      $scope.SkillListdata=[];
      for (var i = 0;i<getResponse.length;i++) {
        
        if (selectedSubCompetency==getResponse[i].sub_competency) {
          console.log("selectedSubCompetency skills"+getResponse[i].skills);        
          if ($scope.SkillListdata.indexOf(getResponse[i].skills) == -1) {
            $scope.SkillListdata.push(getResponse[i].skills);
               console.log("skills::"+JSON.stringify($scope.SkillListdata));
            }
        };
      };
      self.SkillSet=$scope.SkillListdata;
      
   }

   function querySearchSkills (query) {
    console.log("SubCompetency::"+query); 
      var results = query ? self.SkillSet.filter( createFilterFor(query) ) : self.SkillSet,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSkillsChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
        $scope.Competency=$scope.SubCompetencyfilter;
        
       };
    }
    function selectedSkillsChange(item) {
            // $scope.carrymodel.City=item;
            self.selectedSkills=item;
            $scope.Competency=($filter('filter')($scope.SubCompetencyfilter,{skills:item}))
            $scope.skillsfilter=$scope.Competency;
  // console.log("selectedCity::"+JSON.stringify($scope.carrymodel.City))
      $log.info('Skills changed to ' + JSON.stringify(item));
         $scope.example=item;
      // $scope.getBuilding(item,LocationResponse);
    }
  $scope.selectCompetency=[];

//  certification

// Certifying_authority
    self.querySearchCertifying_authority   = querySearchCertifying_authority;
    self.selectedCertifying_authorityChange = selectedCertifying_authorityChange;
    self.searchCertifying_authorityChange   = searchCertifying_authorityChange;
    // Certification
    self.querySearchCertification   = querySearchCertification;
    self.selectedCertificationChange = selectedCertificationChange;
    self.searchCertificationChange   = searchCertificationChange;
    this.dis_Certification=true;

/*Certifying Authority*/
   $scope.getTrainerCertification=function(getResponse)
   {  console.log("getResponse"+JSON.stringify(getResponse));
      $scope.Certifying_authorityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.Certifying_authorityList.indexOf(getResponse[i].Certifying_Authority) == -1) 
        {
         $scope.Certifying_authorityList.push(getResponse[i].Certifying_Authority);
        }
     }
       console.log("Certifying_authority List::"+$scope.Certifying_authorityList);
      self.Certifying_authoritydata=$scope.Certifying_authorityList;
   }

   function querySearchCertifying_authority (query) 
 {     
    console.log("datas::"+JSON.stringify(self.Certifying_authoritydata));
      console.log("sr::"+query); 
      var results = query ? self.Certifying_authoritydata.filter( createFilterFor(query) ) : self.Certifying_authoritydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCertifying_authorityChange(text)
    {   
      $scope.Certification=CertificateResponse;
      $log.info('Text changed to ' + text);
    }
  function selectedCertifying_authorityChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {      this.searchCertification="";
          this.dis_Certification=true;
          $scope.Certification=CertificateResponse;
         
         
    }
      else{
        this.dis_Certification=false;
      self.selectedCertifying_authority=item;
       $scope.Certification=($filter('filter')($scope.Certification, {Certifying_Authority: item}));
       $scope.Certifying_authorityfliter=$scope.Certification;
       $scope.getCertificationdata(self.selectedCertifying_authority,CertificateResponse);

       console.log()
       $scope.certf=item;
     }
    }

  
  /*certification*/
  $scope.getCertificationdata=function(selectedCertifying_authority,getResponse)
    {         
      $scope.CertificationList=[];
      for (var i = 0;i<getResponse.length;i++) 
      {
        if (selectedCertifying_authority==getResponse[i].Certifying_Authority)
         {
          if ($scope.CertificationList.indexOf(getResponse[i].Certification) == -1)
           {
             $scope.CertificationList.push(getResponse[i].Certification);
          }
        };  
      };
      self.Certificationdata=$scope.CertificationList;
      console.log("Certification List::"+self.Certification);
  }
   
   function querySearchCertification (query) {
    console.log("Certification::"+query); 
      var results = query ? self.Certificationdata.filter( createFilterFor(query) ) : self.Certificationdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchCertificationChange(text) {
      $log.info('Text changed to ' + text);
      
    }
    function selectedCertificationChange(item) {
    if(item == undefined)
    {   
      $scope.Certification=$scope.Certifying_authorityfliter;
    } 
   else{
       self.selectedCertification=item;
      console.log("Certification"+JSON.stringify(self.selectedCertification))
      $scope.Certification= ($filter('filter')($scope.Certifying_authorityfliter,{Certification:self.selectedCertification})); 
      $scope.certf=item;
      }
    }







//Tags
self.tags=[];
var skillarr=[];
self.item=[];
$scope.compInit=function(){
    if (!angular.isDefined($scope.carrymodel.tags)) {
      $scope.carrymodel.tags=[];
    }; 
  }
$scope.browseClick=function(){
  $scope.kok=false;
  console.log(JSON.stringify($scope.carrymodel));
}





//SORT
$scope.vsorttrainer=true;
$scope.trainerSortIcon="arrow_drop_down";
$scope.sorttrainer=function(){
  if ($scope.vsorttrainer==true) {
    $scope.orderList = "selectemployee[0].firstname";
    $scope.vsorttrainer=false;
    $scope.trainerSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-selectemployee[0].firstname";
    $scope.vsorttrainer=true;
    $scope.trainerSortIcon="arrow_drop_down";
  }
}

$scope.vsorttrainertype=true;
$scope.trainertypeSortIcon="arrow_drop_down";
$scope.sorttrainertype=function(){
  if ($scope.vsorttrainertype==true) {
    $scope.orderList = "trainertype";
    $scope.vsorttrainertype=false;
    $scope.trainertypeSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-trainertype";
    $scope.vsorttrainertype=true;
    $scope.trainerSortIcon="arrow_drop_down";
  }
}

$scope.vsorttrainerSkills=true;
$scope.trainerSkillsSortIcon="arrow_drop_down";
$scope.sortSkills=function(){
  if ($scope.vsorttrainerSkills==true) {
    $scope.orderList = "selectcompetency[0].skills";
    $scope.vsorttrainerSkills=false;
    $scope.trainerSkillsSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-selectcompetency[0].skills";
    $scope.vsorttrainerSkills=true;
    $scope.trainerSkilllsSortIcon="arrow_drop_down";
  }
}
    


// pick trainer sort
$scope.vsortname=true;
$scope.nameSortIcon="arrow_drop_down";
$scope.sortName=function(){

  if ($scope.vsortname==true) {
    $scope.orderList = "firstname";
    $scope.vsortname=false;
    $scope.nameSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-firstname";
    $scope.vsortname=true;
    $scope.nameSortIcon="arrow_drop_down";
  }
}

$scope.vsortemail=true;
$scope.emailSortIcon="arrow_drop_down";
$scope.sortemail=function(){
  
  if ($scope.vsortemail==true) {
    $scope.orderList = "email";
    $scope.vsortemail=false;
    $scope.emailSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-email";
    $scope.vsortemail=true;
    $scope.emailSortIcon="arrow_drop_down";
  }
}


$scope.vsortphone=true;
$scope.phoneSortIcon="arrow_drop_down";
$scope.sortphone=function(){
  if ($scope.vsortphone==true) {
    $scope.orderList = "email";
    $scope.vsortphone=false;
    $scope.phoneSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-email";
    $scope.vsortphone=true;
    $scope.phoneSortIcon="arrow_drop_down";
  }
}

$scope.vsortmobile=true;
$scope.mobileSortIcon="arrow_drop_down";
$scope.sortmobile=function(){
  if ($scope.vsortmobile==true) {
    $scope.orderList = "mobilenumber";
    $scope.vsortmobile=false;
    $scope.mobileSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mobilenumber";
    $scope.vsortmobile=true;
    $scope.mobileSortIcon="arrow_drop_down";
  }
}


function addTrainerController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
}




});