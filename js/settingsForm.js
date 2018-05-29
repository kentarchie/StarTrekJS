let SettingsForm = function( formDivID,settingsButtonID)
{
   this.formDivID = formDivID;
   this.settingsButtonID = settingsButtonID;

	this.Menu=$('#'+this.formDivID)
         ,this.SettingsButton=$('#'+this.settingsButtonID);
   this.SettingsFormOn = 'Change Settings', this.SettingsFormOff = 'Save Changes';

   let BodyStyle = getComputedStyle(document.body); // to get :root variables
   this.buttonFinishTop   =  BodyStyle.getPropertyValue('--buttonFinishTop');
   this.hideRightPosition = BodyStyle.getPropertyValue('--hideRightPosition');
   console.log(`final buttonFinishTop=:${this.buttonFinishTop}:`);
   console.log(`final hideRightPosition=:${this.hideRightPosition}:`);
   this.logAppendInput = $('#logAppend');
   this.logPriority = $('#priority');

	this.SettingsButton.html(this.SettingsFormOn);
} // SettingsForm

$.extend(SettingsForm.prototype, {
      initializeForm: function() {
         let that=this;
			this.SettingsButton.click(function(ev) {
            console.log('click start');
            ev.preventDefault();
            ['onScreen','offScreen'].map((e)  => {that.Menu.removeClass(e);});
            ['buttonUp','buttonDown'].map((e) => {that.SettingsButton.removeClass(e);});
				let buttonLabel = $.trim(that.SettingsButton.text());

            if(buttonLabel == that.SettingsFormOn) {
				   that.Menu.addClass('onScreen');
				   that.SettingsButton.toggleClass('buttonDown');
               that.Menu.css('right','0px');
               console.log(`FormOn: buttonFinishTop=:${that.buttonFinishTop}:`);
               that.SettingsButton.css('top',that.buttonFinishTop);
               buttonLabel = that.SettingsFormOff;
               that.loadSettings();
            }
            else {
				   that.Menu.addClass('offScreen');
				   that.SettingsButton.toggleClass('buttonUp');
               console.log(`FormOff: hideRightPosition=:${that.hideRightPosition}:`);
				   that.Menu.css('right',that.hideRightPosition);
               that.SettingsButton.css('top','0px');
               buttonLabel = that.SettingsFormOn;
               that.saveSettings();
            }
            console.log(`FINAL buttonLabel=:${buttonLabel}:`);
				that.SettingsButton.html(buttonLabel);
		   }); // openSettings click
      } // initialize()
      ,getLogAppend: function() {
         return(that.logAppendInput.val());
      } // getLogAppend()
      ,getPriority: function() {
         return(that.priorityInput.val());
      } // getPriority()
      ,getPlaymode: function() {
         return($('input[name=playMode]:checked').val());
      } // getPlaymode()
      ,saveSettings: function() {
          Cookies.set('settings', { 
               "playMode"   : $('input[name=playMode]:checked').val()
               ,"priority"  : $('#priority').val()
               ,"logAppend" : $('#logAppend').val()
          });
      } // saveSettings()
      ,loadSettings: function() {
          let settings = Cookies.getJSON('settings');
          if(settings == null) return;
          //console.log(JSON.stringify(settings,null,'\t'));
          if(settings['playMode'] == 'fast')
            document.getElementById('fastMode').checked=true;
          else 
            document.getElementById('slowMode').checked=true;
          $('#priority').val(settings['priority']);
          $('#logAppend').attr('checked', (settings['logAppend'] == 'on'));
      } // loadSettings()
});
