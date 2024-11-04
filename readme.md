# Reach

https://github.com/Reach-Industries/Frontend-React-Developer-Test

To run locally:

```
npm ci
npm run dev
```

Also auto deploys on push to static github pages url at [https://burt202.github.io/reach/](https://burt202.github.io/reach/)

### Thoughts

Overall, I probably spent about 5-6 hours on the implementation here, but that doesnt include some research and test scripts that I did the night before (thats when i found the web socket endpoint wasnt working).

I enjoyed the task and it covered some areas I am less familiar with which I always find interesting delving into. I am happy with what I have built on the most part, but I am fully aware Im probably a bit off with annotation code. On the flip side, I am fully invested now in learning more in this area to improve my understanding and implementation on this code regardless of the outcome of this process.

### Design Decisions

- used React + Webpack instead of NextJS (with server) just so i could deploy to a statically hosted site easier
- i used scaffolding from a previous project to get going, this included tailwind, but Im familiar with many other css frameworks
- as there was some new things for me to learn, i decided to focus on functionality rather than looks
- the 2 other mock observations use the same video and web socket endpoint but do have different annotation data, i did this to demonstrate the dynamic routes without a big amount of more effort
- used zod to validate annotation and web socket data to ensure responses are what the FE code is expecting

### If I Had More Time

- probably improve the look and feel, im not much of a designer though so it would still be on the simpler side just with a bit more polish
- maybe introduce state management or something like `react-query` to avoid the annotations being over-fetched
- look into alternatives to `requestVideoFrameCallback` as its not supported in Firefox, this includes seeing if there are any existing npm modules that have solved this problem rather than hand-rolling the code
- make it responsive with slide-in hamburger menu
- add some component tests and maybe introduce storybook - theres definitely a couple of components that could be tested with jest/react-testing-library like `Sidebar` and the individual chat messages (needs to be split out first). Introducing storybook too would enable components to be written and viewed outside of the context of the app which can be useful
- error handling for failing to connect to the web socket

### References

- [https://requestvideoframecallback.glitch.me/](https://requestvideoframecallback.glitch.me/)
- [https://codesandbox.io/s/download-json-file-with-js-p9t1z?file=/index.html](https://codesandbox.io/s/download-json-file-with-js-p9t1z?file=/index.html)
- [https://www.telerik.com/blogs/websockets-react-apps](https://www.telerik.com/blogs/websockets-react-apps)
