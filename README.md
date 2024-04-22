*** This is a work in progress! ***

I have used Fredrick Emmanuel's tutorial as the base for this project. The tutorial can be found here: https://strapi.io/blog/how-to-build-a-to-do-app-using-next-js-and-strapi

I have used ChatGPT as my assistant to tackle some problems. I also want to give a big shoutout to my friend who has helped me forward when I've been stuck with this project!

This project is an itemlist with create, read, update and delete functions. The frontend is in frontend-app folder and backend in strapi folder. This project uses Strapi, Next.js, TypeScript and Apollo. The purpose of this project is to get me familiar with Strapi and how to connect frontend to backend.

-----

Apr. 22 2024:
In this second version of my Todo listing I have added a new field for due dates, sort the listing using this due date parameter and do the editing in a popup modal instead of a prompt window. The editing is working correctly but I still have to sort out how to refresh the item listing after user updates anything. Right now the edit can be seen after manually refreshing the page. I will also add proper errors in my next steps.

Feb. 8 2024:
Right now this project is almost identical with the tutorial. I have made some changes to the UI and I'm continuing to develop this project further to better understand how Strapi works. My next step is to fetch the text I'm updating on the input field and change the editing UI to a modal instead of alert. After that I'll create more fields (like a due date) to Strapi and fetch that data into the itemlist.
