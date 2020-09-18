import semver from 'semver';
declare type Semver = string; 
declare type ModsVersions = Record<string, Semver>;

declare type Manifest = {
    dependencies: ModsVersions;
};

export default class DependencyChecker {

    static findOutdated(dependencies: ModsVersions, latestVersions: ModsVersions): ModsVersions {
        let outdated: ModsVersions = {};
        for (const [name, version] of Object.entries(dependencies)) {
            const latestVersion = latestVersions[name];
            if (latestVersion) {
                if (!semver.satisfies(latestVersion, version)) {
                    if (semver.gtr(latestVersion, version)) {
                        outdated[name] = latestVersion;
                    }
                }
            }
        }
        return outdated;
    }
}