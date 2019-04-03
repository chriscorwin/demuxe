

has-drawer-from-left

I am designing a re-factor of Magick Flows "drawers".

Current behaviour: a drawer slides in upon navigating to a step, and it slides out just before navigating away.

I need more fine-grained control over that process.

I need names for the metadata.

In the list below, "already" is a placeholder here for new functionality where a drawer will _already be open_ when you arrive at a step.

Of course, "already" is a terrible name for this.

Help?


In fact, I'll put `show-drawer-from-left--kempt` in there as a shortcut to the combo of `show-drawer-from-left--instantly__hide-drawer-from-left--never`.

show-drawer-from-left--kempt


show-drawer-from-left--instantly__hide-drawer-from-left--never
show-drawer-from-left--on-arrival__hide-drawer-from-left--never

show-drawer-from-right--on-arrival__show-drawer-from-right--on-leave
show-drawer-bottom-top--on-arrival__show-drawer-from-bottom--on-leave
show-drawer-left-top--on-arrival__show-drawer-from-left--on-leave

```

show-drawer-from-left--on-arrival
show-drawer-from-left--on-leave
show-drawer-from-left--never

hide-drawer-from-left--instantly
hide-drawer-from-left--on-arrival
hide-drawer-from-left--on-leave

hide-drawer-from-left--never
```

* on arrival
    * has no drawer
    * has drawer
        * is open
            * close immediately
            * do not close
        * is closed
            * open immediately
            * do not open
* on leave
    * has no drawer
    * has drawer
        * is open
            * close immediately
            * do not close
        * is closed
            * open immediately
            * do not open

