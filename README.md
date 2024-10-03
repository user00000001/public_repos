# multi repos managed in branches.

```shell
#git checkout --orphan new_branch
git worktree add --orphan -b new_branch ../branch_dir
git branch -v
git push origin --all
git branch -r | grep -v '\->' | while read remote; do git branch --set-upstream-to=${remote} ${remote#*/}; done
#git branch -r | grep -v '\->' | while read remote; do git branch --track ${remote#*/} ${remote}; done
git pull --all
```
