import type { APIRoute } from "astro";
import { prisma } from "#lib/server/db"
import semver from "semver";

export const GET: APIRoute = async ({ params, props, request, redirect }) => {
	const { package: packageName, version } = params;

	if (!packageName || !version) {
		return new Response("Missing package or version" ,{ status: 400 });
	}

	const parsedVersion = semver.coerce(version, {
		includePrerelease: true,
	});

	if (!parsedVersion) {
		return new Response("Invalid version, please make sure to pass a semver compatible version", { status: 400 });
	}

	const pkg = await prisma.package.findUnique({
		where: {
			name: packageName
		},
		include: {
			revisions: true
		}
	})

	if (!pkg) {
		return new Response("Package not found", { status: 404 });
	}

	const revision = pkg.revisions.find((rev) => rev.version === parsedVersion.toString());

	if (!revision) {
		return new Response("Version not found", { status: 404 });
	}

	return redirect(`${revision.repository}/archive/${revision.version}.tar.gz`);
}