---
title: "Aligning my Chakras"
date: "August 25, 2021"
excerpt: "A shiny new coat of paint"
cover_image: "/images/posts/img4.jpg"
---

# Chakra

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If it is not obvious by all the fancy new colors and styling ya boy got his drip right with help from a powerful tool called Chakra UI. Chakra is a style library hell bent on merging your styles to the actual components you are building, which at first looks wild when like me CSS was the last thing I worrried about when making a project to now style goes hand in hand with the functionality in how I go about writting my components. Thier default themes out of the box are really well done and make visualizing you component as it is being fleshed out that much easier, but the fun part comes in when you break away from the default theming and start making your own which is where I fell in love with this library. Having said that I now will exclusivly be using Chakra for all my style needs as it has changed the way I even think about writing my componets and my projects as a whole.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; What makes Chakra so powerful is once it is set up it becomes plug and play with new components fitting in with the overall theme seemlessly without all of the time being spent on individually styling them with hundreds of lines of CSS which at scale becomes a job in istelf to maintain and ensure nothing clashes. On top of that if you decide to change something you do it in one place and your whole project reflects it without having to dig through everything saving a huge amount of time.

I am severly underselling the power this library provides peep their **[Docs](https://chakra-ui.com/docs/getting-started)** and check out the massive amount of out of the box stuff you can do. Becasue if I can produce the site you're on rn with the limited knowledge I have imagine what you can do.

Here is my **[GitHub](https://github.com/ZachCodedThat?tab=repositories)** so you can see what I have been struggling with recently.

---

# Did it hurt??

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Not as much as you'd think for someone like me with limited CSS knowledge, Chakra does a great job at explaning exactly what everything does and how to link everything together making the writting experience enjoyable when I think of how many lines of CSS it would require to achieve the same results. Not to mention the mountain of Youtube and Google resources out there which if you know how to ask the right questions are an unlimited well of knowledge that will help you make Chakra sing.

---

# Rip it out by the roots.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The actual process of implementation was something of a goal I set for myself and I can say for the most part I hit the mark. There is always more I can learn and better ways to do things but as of this writting I am pumpped I got it to work as well as it currently is.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I began by moving the global CSS style sheet out of the project. I didn't want to delete it out right becasue at that moment i didn't know if I would be able to make it work at all let alone where I ended up. It was jarring watching my site revert back to base HTML and a wave of wtf are you doing Zach hits but was imedietly replaced by a feeling of excitment because from my limited experiecne writing code everything can be reverted and that I was one git pull away from saftey and I was from then on determined to make this happen.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Once I grasped the basic concepts of how Chakra blends into the component writting process the snowball began to pick up speed, it feels like playing with legos that you can change any aspect about on the fly and they always fit together. My biggest aha moment came when implmenting Darkmode for the whole project. I did alot of reading and youtube watching to see how I could bake it in with my existing css styling and needless to say my brain was melted by the end of it and I was no closer to the glorious eye relief darkmode provides. With Chakra it boils down to some React hooks provided in the library that does the heavy lifting of placing your stylings in a "light" and "dark" bucket and providing a button that like magic swaps between the two. The below code black is the synthasis of hundreds of line of CSS needed to produce the same result.

```
import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: "black",
    dark: "highlight",
  };

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
      background="none"
      alignContent="center"
      size="lg"
    />
  );
};

export default DarkModeSwitch;
```

---

# So what now?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you made it this far down the page without vomiting big props. I will post about stuff I am working on/with to get better at writing and to solidify the knowledge for that thing. I have no set theme and like with most things will wing it and see what happens.
