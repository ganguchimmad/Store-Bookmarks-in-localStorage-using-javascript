//listen for form submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

	function saveBookmark(e){
		//get form values
		var sitename=document.getElementById('sitename').value;
		var siteurl=document.getElementById('siteurl').value;
		
		//validation
			if(!sitename || !siteurl){
				alert("please fill in the form");
				return false;
			}
		var bookmark={
			name: sitename,
			url: siteurl
		}
		
		//test if bookmarks is null
		if(localStorage.getItem('bookmarks')===null){
			// init array
			var data = [];
			//add to array
			data.push(bookmark);
			// set to localStorage
			console.log(data);
			localStorage.setItem('bookmarks',JSON.stringify(data));
		}
		else{
			//get bookmarks from localStorage
			var data = JSON.parse(localStorage.getItem('bookmarks'));
			//Add bookmark to array
			data.push(bookmark);
			//re set back to loaclstorege
			localStorage.setItem('bookmarks',JSON.stringify(data));
		}
		//clear textbox value
		clear();
		// fetch bookmarks
		fetchbookmark();
		
	}
	
	function fetchbookmark(){
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			//get output ids
			
			var bookmarkresult = document.getElementById("bookmarkresult");
			//build output
			
			bookmarkresult.innerHTML = '';
			for(var i=0;i<bookmarks.length;i++){
				var name = bookmarks[i].name;
				var url = bookmarks[i].url;
				
				bookmarkresult.innerHTML += '<div class="card-panel">'+
											'<h6>'+name+
											'<div class="right"><a class="btn waves-effect green center" target="_blank" href="'+url+'">Visit</a>'+"  "+
											'<a class="btn waves-effect red" onclick="deletebookmark(\''+url+'\')" target="_blank">Delete</a></div>'
											
											'</h6>'+
											'</div>';
			}
		}
		
	// delete the bookmark
	function deletebookmark(url){
		//get bookmarks from localStorage
		var bookmark = JSON.parse(localStorage.getItem("bookmarks"));
		for(var i=0;i<bookmark.length;i++){
			if(bookmark[i].url==url){
				//remove from bookmark
				bookmark.splice(i,1);
			}
		}
		//re-set bookmarks from loaclstorege
		localStorage.setItem('bookmarks',JSON.stringify(bookmark));
		// re-fetch bookmarks
		fetchbookmark();
	}
	
	// clear textbox value after save the bookmark
	function clear(){
		document.getElementById('sitename').value="";
		document.getElementById('siteurl').value="";
	}