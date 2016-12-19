from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.start),
	url(r'^WebCrawler$', views.crawler),
	url(r'^WBS$', views.WBS),
	url(r'^FHB$', views.FHB),
	url(r'^zoo$', views.zoo),
	url(r'^Snake$', views.Snake),
	url(r'^END$', views.END),
	url(r'^END2$', views.END2),
	url(r'^MoneyGame$', views.moneyGame),
	url(r'^click2$', views.click2),
    url(r'^reset$', views.reset),
    url(r'^store$', views.store),
    url(r'^men$', views.men),
    url(r'^fire$', views.fire),
    url(r'^betterPro$', views.betterPro),
	url(r'^click$', views.click),
	url(r'^reset1$', views.reset1),
	url(r'^ticInc$', views.ticInc),
	url(r'^ticDec$', views.ticDec),
	url(r'^addWorkers$', views.addWorkers),
	url(r'^subWorkers$', views.subWorkers),
	url(r'^dolph$', views.dolph),
	url(r'^polarBear$', views.polarBear),
	url(r'^gorilla$', views.gorilla),
	url(r'^dino$', views.dino),
	url(r'^HRDreset$', views.HRDreset),
]