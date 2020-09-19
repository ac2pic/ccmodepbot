import semver from 'semver';
import {ModDependencies, ModDependencyDetails} from 'ultimate-crosscode-typedefs/file-types/mod-manifest';


export default class DependencyChecker {

    static findOutdated(dependencies: ModDependencies, latestVersions: Record<string, string>): ModDependencies {
        let outdated: ModDependencies = {};
        for (const [name, version] of Object.entries(dependencies)) {
            const latestVersion = latestVersions[name];
            let currentVersion: string;
            let optional = false; 
            
            if (typeof version !== "string") {
                currentVersion = version.version;
                optional = !!version.optional;
            } else {
                currentVersion = version;
            }

            if (latestVersion) {
                if (semver.validRange(currentVersion)) {
                    if (!semver.satisfies(latestVersion, currentVersion)) {
                        if (semver.gtr(latestVersion, currentVersion)) {
                            if (optional) {
                                outdated[name] = <ModDependencyDetails>{
                                    version: latestVersion,
                                    optional: optional
                                };
                            } else {
                                outdated[name] = latestVersion;
                            }
                        }
                    }
                }
            }

        }
        return outdated;
    }
}