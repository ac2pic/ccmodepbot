import DependencyChecker from '../src/dependency-checker';

test('no latest versions provided to equal empty outdated', () => {
    const mockDependencyList = {
        "my-mod": "v0.0.0"
    };

    const mockLatestVersions = {};
    expect(DependencyChecker.findOutdated(mockDependencyList, mockLatestVersions))
        .toStrictEqual({});
});

test('if dependency range is converted to latest version if outdated', () => {
    const mockDependencyList = {
        "my-mod": "^0.*"
    };

    const mockLatestVersions = {
        "my-mod": "1.0.5"
    };
    expect(DependencyChecker.findOutdated(mockDependencyList, mockLatestVersions))
        .toStrictEqual({
            "my-mod": "1.0.5"
        });
})

test('if dependency is newer than database provided version returns nothing', () => {
    const mockDependencyList = {
        "my-mod": "1.0.6"
    };

    const mockLatestVersions = {
        "my-mod": "1.0.5"
    };

    expect(DependencyChecker.findOutdated(mockDependencyList, mockLatestVersions))
        .toStrictEqual({});
})
