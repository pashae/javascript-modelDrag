function getByClass(clsName,parent) {
	//这是一个在瀑布流中讲解过的函数
	//可以取到特定id下的某种类名的元素
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload = drag;
//鼠标拖拽函数
function drag() {
	var oTitle = getByClass("login_logo_webqq","loginPanel")[0];
	//添加鼠标按下事件，实现拖拽
	oTitle.onmousedown = fnDown;
	//添加关闭事件
	var oClose = document.getElementById("ui_boxyClose");
	oClose.onclick = function() {
		document.getElementById("loginPanel").style.display = "none";
	}
	//切换状态
	var loginState = document.getElementById("loginState");
	var stateList = document.getElementById("loginStatePanel");
	var list = stateList.getElementsByTagName("li");
	var stateTxt = document.getElementById("login2qq_state_txt");
	var loginStateShow = document.getElementById("loginStateShow");
	
	//点击状态栏，显示所有状态
	loginState.onclick = function(event) {
		//依旧要阻止冒泡
		event = event || window.event;
		if(event.stopPropagation) {
			//非IE内核
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
		stateList.style.display = "block";
	}
	
	//鼠标滑过、离开和点击状态列表时的方法
	for(var i=0,l=list.length;i<l;i++) {
		//鼠标滑过
		list[i].onmouseover = function() {
			this.style.background = "#567";
		}
		//鼠标离开
		list[i].onmouseout = function() {
			this.style.background = "#FFF";
		}
		//鼠标点击
		list[i].onclick = function(event) {
			//阻止冒泡事件的发生
			event = event || window.event;
			if(event.stopPropagation) {
				//非IE内核
				event.stopPropagation();
			}else {
				event.cancelBubble = true;
			}

			var oId = this.id;
			stateList.style.display = "none";
			stateTxt.innerHTML = getByClass("stateSelect_text",oId)[0].innerHTML;
			loginStateShow.className = "";
			loginStateShow.className = "login-state-show " + oId;
		}
	}
	document.onclick = function() {
		stateList.style.display = "none";
	}
}
//鼠标按下函数
function fnDown(event) {
	event = event || window.event;
	var oDrag = document.getElementById("loginPanel");
	//这是一个基于BUG求出的转移距离
	var translateX = event.clientX - oDrag.offsetLeft;
	var translateY = event.clientY - oDrag.offsetTop;
	//移动
	document.onmousemove = function(event) {
		event = event || window.event;
		fnMove(event,translateX,translateY);
	}
	//释放
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
//鼠标移动函数
function fnMove(e,posX,posY) {
	var l = e.clientX - posX;
	var t = e.clientY - posY;
	var oDrag = document.getElementById("loginPanel");
	//定义两个变量，限制模块的拖动范围
	var winW = document.documentElement.clientWidth || document.body.clientWidth;
	var winH = document.documentElement.clientHeight || document.body.clientHeight;
	//这里出现的两个数字10是因为在样式的设置中，为关闭按钮设置了left:-10px top:-10px
	//为了保证在拖动的过程中不会出现上右溢出的现象，故需要对移动的距离进行适当的设置
	var maxW = winW - oDrag.offsetWidth - 10;
	var maxH = winH - oDrag.offsetHeight;
	if(l<0) {
		l = 0;
	}else if(l>maxW) {
		l = maxW;
	}
	if(t<0) {
		t = 10;
	}else if(t>maxH) {
		t = maxH;
	}
	oDrag.style.left = l + "px";
	oDrag.style.top = t + "px";
}