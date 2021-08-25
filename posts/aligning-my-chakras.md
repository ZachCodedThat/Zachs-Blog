---
title: "Aligning my Chakras"
date: "August 25, 2021"
excerpt: "A shiny new coat of paint"
cover_image: "/images/posts/img1.jpg"
---

# Chakra

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If it is not obvious by all the fancy new colors and styling ya boy got his drip right with help from a powerful tool called Chakra UI. Chakra is a component library hell bent on merging your styles to the actual components you are building, which at first looks wild when like me CSS was the last thing I worried about when making a project to now style goes hand in hand with the functionality in how I go about writing my components. Their default themes out of the box are really well done and make visualizing you component as it is being fleshed out that much easier, but the fun part comes in when you break away from the default theming and start making your own which is where I fell in love with this library. Having said that I now will exclusively be using Chakra for all my style needs as it has changed the way I even think about writing my components and my projects as a whole.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; What makes Chakra so powerful is once it is set up it becomes plug and play with new components fitting in with the overall theme seamlessly without all of the time being spent on individually styling them with hundreds of lines of CSS which at scale becomes a job in itself to maintain and ensure nothing clashes. On top of that if you decide to change something you do it in one place and your whole project reflects it without having to dig through everything saving a huge amount of time.

I am severely underselling the power this library provides peep their **[Docs](https://chakra-ui.com/docs/getting-started)** and check out the massive amount of out of the box stuff you can do. Because if I can produce the site you're on rn with the limited knowledge I have imagine what you can do.

Here is my **[GitHub](https://github.com/ZachCodedThat?tab=repositories)** so you can see what I have been struggling with recently.

---

# Did it hurt??

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Not as much as you'd think for someone like me with limited CSS knowledge, Chakra does a great job at explaining exactly what everything does and how to link everything together making the writing experience enjoyable when I think of how many lines of CSS it would require to achieve the same results. Not to mention the mountain of YouTube and Google resources out there which if you know how to ask the right questions are an unlimited well of knowledge that will help you make Chakra sing.

---

# Rip it out by the roots.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The actual process of implementation was something of a goal I set for myself and I can say for the most part I hit the mark. There is always more I can learn and better ways to do things but as of this writing I am pumped I got it to work as well as it currently is.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I began by moving the global CSS style sheet out of the project. I didn't want to delete it out right because at that moment i didn't know if I would be able to make it work at all let alone where I ended up. It was jarring watching my site revert back to base HTML and a wave of wtf are you doing Zach hits but was immediately replaced by a feeling of excitement because from my limited experience writing code everything can be reverted and that I was one git pull away from safety and I was from then on determined to make this happen.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Once I grasped the basic concepts of how Chakra blends into the component writing process the snowball began to pick up speed, it feels like playing with Legos that you can change any aspect about on the fly and they always fit together. My biggest aha moment came when implementing dark mode for the whole project. I did a lot of reading and youtubing to see how I could bake it in with my existing CSS styling and needless to say my brain was cooked by the end of it and I was no closer to the glorious eye relief dark mode provides. With Chakra it boils down to some React hooks like useColorMode() that are provided in the library that do the heavy lifting of placing your stylings in a "light" and "dark" bucket and funneling it through a button that like magic swaps between the two.

---

# Bugging the shit out of me.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It wasn't all sunshine and rainbows during this process. There were moments I wanted to just throw the branch away and act like I never touched Chakra. When things don't work for seemingly no reason it is incredibly frustrating but this provided a golden opportunity to work on a skill I feel is the most important for a new developer like my self...Debugging.

Debugging takes many forms but I have noticed in this instance it boils down to a few main points.

&nbsp;&nbsp;Something is out of place.

&nbsp;&nbsp;I didn't implement it right.

&nbsp;&nbsp;Something is clashing.

&nbsp;&nbsp;I spelled it wrong.

Again I am underplaying things and there are thousands of ways a program can break but those things are the main reasons I wanted to throw my keyboard at the wall while working with Chakra and this project as a whole. However these issues allowed me to work with and get comfortable using all the various tools provided to pin point the problem and work on a fix, things like Console.log() , Chrome Dev Tools and the terminal.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What this has also taught me is how to ask the right questions to Google or someone helping me work through an issue. Being able to properly explain the issue you are having is half the battle in trying to solve it, Google is only as good as the questions you ask it. Unless you are on the bleeding edge of new frameworks and tools there is likely someone who has experienced your issue and have worked a solution out or can at least provide better insight on where to look for one.

---

# So what now?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You made it! Great job here's a **[gold star](https://image.shutterstock.com/image-vector/christmas-star-isolated-on-white-600w-1920705410.jpg)**. I am working on setting up a DB to store my blogs and a way to write them directly from the site which has proven to me that I don't know shit about annnnnything but I will talk about that next time once I get the damn thing working, but in the mean time do that thing you always wanted to but haven't.
