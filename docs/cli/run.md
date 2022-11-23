# Run Suites

The `run` command is used to run one or more suites.

If you use it without additional parameters, QA Flag will ask you which suite you want to run.

```bash
qaflag run
```

Adding the full name after `run` you can specify which suite to run

```bash
qaflag run UsersSuite
```

If you want to run more than one, you can add additional suite names, space-separated:

```bash
qaflag run UsersSuite VideosSuite
```

It can also take wildcards, within quotes, and capitalization is irrelevant:

```bash
qaflag run "users*"
```

If you want to run all of your test suites, use the `--all` argument

```bash
qaflag run --all
```

For any of the above commands you can add `--build` to have it rebuild the tests before running

```bash
qaflag run --build --all
```

To change the base URL from what is in the `qaflag.json` default:

```bash
qaflag run --base https://staging.some.domain
```
